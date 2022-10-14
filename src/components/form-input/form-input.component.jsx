import { FormInputLabel, Group, Input } from './form-input.styles';

const FormInput = ({ label, ...otherProps }) => {
  return (
    <Group>
      <Input {...otherProps} />
      {/* L'opérateur "&&" permet de lancer le code qui suit
    uniquement si la condition retourne true */}
      {label && <FormInputLabel shrink={otherProps.value.length}>{label}</FormInputLabel>}
    </Group>
  );
};

export default FormInput;
