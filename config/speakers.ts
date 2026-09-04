/**
 * Спикеры ещё не подтверждены.
 * Пустой массив → секция Speakers скрыта целиком (§7).
 * Пустые карточки не показывать ни при каких условиях.
 */

export type Speaker = {
  id: string;
  /** имя не переводится (§9) */
  name: string;
  affiliation: string;
  /** тема доклада — ключ в content: speakers.topics.<id>, либо null → [ TBD ] */
  topicKey: string | null;
  photo: string | null;
  linkedin: string | null;
};

export const speakers: Speaker[] = [];
