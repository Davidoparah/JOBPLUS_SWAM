import React from 'react';
import '../styles/form.scss';
import { useNavigate } from 'react-router-dom';
import nav from '../nav/nav';

export default function form() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const formQuery = {
      what: formData.get('what'),
      where: formData.get('where'),
    };

    navigate('/search-result', { state: { formQuery } });
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="form__group">
        <label className="form__label form__label--light">What</label>
        <input
          className="form__field"
          type="text"
          name="what"
          placeholder="Job title, skill or company"
        />
      </div>

      <div className="form__group">
        <label className="form__label form__label--light">Where</label>
        <input
          className="form__field"
          type="text"
          name="where"
          placeholder="Town, city or postcode"
        />
      </div>

      <div className="form__group">
        <input className="form__btn" type="submit" value="Search" />
      </div>
    </form>
  );
}
