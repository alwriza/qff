const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');

function loadTs(path, dependencies = {}) {
  const source = ts.transpileModule(fs.readFileSync(path, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText;
  const exports = {};
  vm.runInNewContext(source, {
    exports, Request, Response,
    console: { error() {} },
    require(name) {
      if (name in dependencies) return dependencies[name];
      throw new Error(`Unexpected dependency: ${name}`);
    },
  });
  return exports;
}

const { parseHackathonRegistration } = loadTs('lib/hackathon-registration.ts');
const valid = {
  fullName: ' Captain Name ', participant1FullName: ' First Participant ', participant2FullName: ' Second Participant ', captainTelegram: 'captain_1',
  captainEmail: ' Captain@Example.com ', teamName: ' Team One ', participationFormat: 'online',
};

test('normalizes contacts and accepts both participation formats', () => {
  const parsed = parseHackathonRegistration(valid);
  assert.equal(parsed.fullName, 'Captain Name');
  assert.equal(parsed.participant1FullName, 'First Participant');
  assert.equal(parsed.participant2FullName, 'Second Participant');
  assert.equal(parsed.captainTelegram, '@captain_1');
  assert.equal(parsed.captainEmail, 'captain@example.com');
  assert.equal(parsed.teamName, 'Team One');
  assert.equal(parseHackathonRegistration({ ...valid, captainTelegram: '@captain_1', participationFormat: 'offline' }).participationFormat, 'offline');
});

test('rejects missing fields, invalid values, wrong types and oversized strings', () => {
  for (const field of Object.keys(valid)) {
    for (const value of ['', '   ', null, 123, {}, []]) {
      assert.equal(parseHackathonRegistration({ ...valid, [field]: value }), null, field);
    }
  }
  for (const value of [null, [], 'text', 12]) assert.equal(parseHackathonRegistration(value), null);
  for (const [field, value] of [
    ['fullName', 'a'.repeat(121)], ['participant1FullName', 'a'.repeat(121)], ['participant2FullName', 'a'.repeat(121)], ['teamName', 'a'.repeat(121)],
    ['captainEmail', 'not-an-email'], ['captainEmail', 'a'.repeat(250) + '@example.com'],
    ['captainTelegram', '@bad user'], ['captainTelegram', 'https://t.me/captain'],
    ['captainTelegram', 'a'.repeat(33)], ['participationFormat', 'hybrid'],
  ]) assert.equal(parseHackathonRegistration({ ...valid, [field]: value }), null, field);
});

function route({ duplicate = false, unavailable = false } = {}) {
  const queries = [];
  const db = {
    async ensureHackathonSchema() { if (unavailable) throw new Error('offline'); },
    getDatabase() {
      return async (strings, ...values) => {
        queries.push({ query: strings.join('?'), values });
        return duplicate ? [] : [{ id: 1 }];
      };
    },
  };
  const { POST } = loadTs('app/api/registrations/route.ts', {
    'next/server': { NextResponse: Response },
    '@/lib/db': db,
    '@/lib/hackathon-registration': { parseHackathonRegistration },
  });
  return { POST, queries };
}
const request = (body) => new Request('http://localhost/api/registrations', { method: 'POST', body: JSON.stringify(body) });

test('API inserts exactly the seven normalized fields using query parameters', async () => {
  const { POST, queries } = route();
  const response = await POST(request({ ...valid, teamName: "Team '); DROP TABLE registrations; --" }));
  assert.equal(response.status, 201);
  assert.equal(queries.length, 1);
  assert.match(queries[0].query, /INSERT INTO hackathon.registrations/);
  assert.equal(queries[0].values.length, 7);
  assert.equal(queries[0].values[1], 'First Participant');
  assert.equal(queries[0].values[2], 'Second Participant');
  assert.equal(queries[0].values[4], 'captain@example.com');
  assert.equal(queries[0].query.includes('DROP TABLE'), false);
});

test('API rejects malformed JSON, invalid data, bots and large payloads before DB access', async () => {
  const { POST, queries } = route();
  assert.equal((await POST(new Request('http://localhost/api/registrations', { method: 'POST', body: '{' }))).status, 400);
  assert.equal((await POST(request({ ...valid, fullName: '' }))).status, 400);
  assert.equal((await POST(request({ ...valid, website: 'spam' }))).status, 400);
  assert.equal((await POST(request({ ...valid, teamName: 'a'.repeat(9000) }))).status, 413);
  assert.equal(queries.length, 0);
});

test('API reports duplicate applications and storage errors without claiming success', async () => {
  assert.equal((await route({ duplicate: true }).POST(request(valid))).status, 409);
  const response = await route({ unavailable: true }).POST(request(valid));
  assert.equal(response.status, 500);
  assert.equal((await response.json()).error, 'registration_failed');
});
