import React from 'react';
import { Input } from '../Input';
import { Button } from '../Button';
import { FaSearch } from 'react-icons/fa';
import { SearchForm } from './style';
import { navigate, useLocation } from '@reach/router';
import queryString from 'query-string';
// import { navigateTo } from 'gatsby';
export function Search() {
  const [searchTerm, setSearchTerm] = React.useState('');
  const { search } = useLocation();
  const c = queryString.parse(search)?.c || '';

  const handleSubmit = e => {
    console.log('clicked');
    e.preventDefault();
    if (c) {
      navigate(
        `/all-products?s=${encodeURIComponent(
          searchTerm
        )}&c=${encodeURIComponent(c)}`
      );
    } else {
      navigate(`/all-products?s=${encodeURIComponent(searchTerm)}`);
    }
  };
  return (
    <SearchForm onSubmit={handleSubmit}>
      <Input
        value={searchTerm}
        onChange={e => setSearchTerm(e.currentTarget.value)}
        placeholder="検索"
      />
      <Button>
        <FaSearch />
      </Button>
    </SearchForm>
  );
}
//e.preventDeafult is to prevent it from reloading via onSubtmit function of Form
