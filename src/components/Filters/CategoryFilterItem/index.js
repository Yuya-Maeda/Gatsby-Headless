import React from 'react';
import { Checkbox } from '../../Checkbox';
import { navigate, useLocation } from '@reach/router';
import { CategoryFitlterItemWrapper } from './style';
import queryString from 'query-string';

export function CategoryFilterItem({ title, id }) {
  const { search } = useLocation();
  const qs = queryString.parse(search);
  const collectionIds = qs.c?.split(',').filter(c => !!c) || [];
//   console.log(collectionIds, 'collectionIds');
  const checked = collectionIds?.find(cId => cId ===id);
  const searchTerm = qs.s;

  const onClick = () => {
    let navigateTo = `/all-products`;
    
    let newIds = [];
    if(checked) { //if already checked remove 
        newIds= collectionIds
        .filter(cId => cId !== id)
        .map(cId => encodeURIComponent(cId))

    }else{ // if not checked yet, add collectionid
        collectionIds.push(id);
        newIds = collectionIds.map(cId => encodeURIComponent(cId));
    }
    //if thereis category checkd or searchTerm 
    if(newIds.length&& !searchTerm){
        navigate(`${navigateTo}?c=${newIds.join(',')}`);

    }else if(newIds.length && !!searchTerm){
        navigate(`${navigateTo}?c=${newIds.join(',')}&s=${encodeURIComponent(searchTerm)}`)
        
      }else if(!newIds.length && !!searchTerm){
        
        navigate(`${navigateTo}?s=${encodeURIComponent(searchTerm)}`)
    }else{
        navigate(`${navigateTo}`)
    }

  };
  return (
    <CategoryFitlterItemWrapper onClick={onClick}>
      <Checkbox checked={checked} />
      <div>{title}</div>
    </CategoryFitlterItemWrapper>
  );
}
