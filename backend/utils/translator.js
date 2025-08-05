import translate from '@vitalets/google-translate-api';

export const translateToHausa = async (text) => {
  const res = await translate(text, { to: 'ha' });
  return res.text;
};
