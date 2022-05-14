import './Button.css';

export default function Button({ changePage }) {
  return (
    <button type="submit" className="Button" onClick={changePage}>
      <span className="Button-label">Load more</span>
    </button>
  );
}
