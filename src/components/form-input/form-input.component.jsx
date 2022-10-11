import './form-input.styles.scss';

const FormInput = ({ label, ...otherProps }) => {
  return (
    <div className="group">
      <input className="form-input" {...otherProps} />

      {/* L'opérateur "&&" permet de lancer le code qui suit
    uniquement si la condition retourne true */}
      {label && (
        <label className={`${otherProps.value.length ? 'shrink' : ''} form-input-label`}>
          {label}
        </label>
      )}
    </div>
  );
};

export default FormInput;
