import css from './Button.module.css';

const Button = ({ loadMore }) => {
  return (
    <button className={css.LoadMore} type="button" onClick={loadMore}>
      Load more
    </button>
  );
};

export default Button;
