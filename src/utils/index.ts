import { computed } from 'vue';

const copy = <T>(obj: T) => JSON.parse(JSON.stringify(obj));

const stringToColour = (str: string) => {
  let hash = 0;
  str.split('').forEach((char) => {
    hash = char.charCodeAt(0) + ((hash << 7) - hash); // 5 default
  });
  let colour = '#';
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    colour += value.toString(16).padStart(2, '0');
  }
  return colour;
};

const makeVModelFromProps = <IProps, EmitOption>(
  propName: keyof IProps,
  props: IProps,
  emit: (event: EmitOption, ...args: any[]) => void
) =>
  computed({
    get: () => props[propName],
    set: (value: IProps[keyof IProps]) =>
      emit(`update:${String(propName)}` as EmitOption, value),
  });

export { copy, stringToColour, makeVModelFromProps };
