import React from 'react';
import { Link } from 'react-router-dom';
import { ButtonProps } from './Button.types';
import { AppLoader } from '../AppLoader';
import styles from './Button.module.scss'
const Button: React.FC<ButtonProps> = ({
  to = null,
  children = null,
  label = null,
  className = '',
  type = 'button',
  buttonStyle = 'primary',
  size = 'md',
  rounded = 'none',
  overrideClass = null,
  disabled = false,
  cases = 'normal',
  isProcessing = false,
  ...buttonProps
}) => {

  const cssClass =
    overrideClass ||
    `${styles.btn} ${styles[`btn-${buttonStyle}`]} ${styles[`btn-size-${size}`]} ${styles[`btn-rounded-${rounded}`]} ${styles[`btn-cases-${cases}`]} ${className}`;

  if (to) {
    return (
      <Link to={to} aria-disabled={disabled} className={styles['btn-basicUnderline']}>
        {children || label}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={cssClass}
      disabled={disabled}
      {...buttonProps} >
      {isProcessing ? (
        <div>
          <AppLoader />
        </div>
      ) : null}
      {children || label}
    </button>
  );
};

export default Button;
