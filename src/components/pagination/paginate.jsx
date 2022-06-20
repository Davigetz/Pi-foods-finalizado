import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  paginateInternal
} from "../../redux/recipes/recipesSlice";
import { range } from "../../utils/range";
import paginateStyle from "./pagination.module.css";

export const DOTS = "...";

function Paginate() {
  const dispatch = useDispatch();
  const objrecipes = useSelector((state) => state.recipes);
  const siblingCount = 1;

  const realCPage = objrecipes.currentPage + 1;
  const totalPagesNumbers = siblingCount;
  let paginationRange;
  if (totalPagesNumbers >= objrecipes.totalPages) {
    paginationRange = range(1, objrecipes.totalPages);
  }

  const leftSiblingIndex = Math.max(realCPage - siblingCount, 1);
  const rightSiblingIndex = Math.min(
    realCPage + siblingCount,
    objrecipes.totalPages
  );

  const shouldShowLeftDots = leftSiblingIndex > 2;
  const shouldShowRightDots = rightSiblingIndex < objrecipes.totalPages - 2;

  const firstPageIndex = 1;
  const lastPageIndex = objrecipes.totalPages;

  if (!shouldShowLeftDots && shouldShowRightDots) {
    let leftItemCount = 3 + 2 * siblingCount;
    let leftRange = range(1, leftItemCount);
    paginationRange = [...leftRange, DOTS, objrecipes.totalPages];
  }

  if (shouldShowLeftDots && !shouldShowRightDots) {
    let rightItemCount = 3 + 2 * siblingCount;
    let rightRange = range(
      objrecipes.totalPages - rightItemCount + 1,
      objrecipes.totalPages
    );

    paginationRange = [firstPageIndex, DOTS, ...rightRange];
  }

  if (shouldShowLeftDots && shouldShowRightDots) {
    let middleRange = range(leftSiblingIndex, rightSiblingIndex);
    paginationRange = [
      firstPageIndex,
      DOTS,
      ...middleRange,
      DOTS,
      lastPageIndex,
    ];
  }

  const onNext = () => {
    const newPage = objrecipes.currentPage + 1;
    // dispatch(fetchRecipes({ name: objrecipes.name, page: newPage }));
    dispatch(paginateInternal({ newPage }));
  };
  const OnPrevious = () => {
    const newPage = objrecipes.currentPage - 1;
    // dispatch(fetchRecipes({ name: objrecipes.name, page: newPage }));
    dispatch(paginateInternal({ newPage }));
  };

  if (realCPage === 0 || paginationRange < 2) {
    return null;
  }
  let lastPage = paginationRange[paginationRange.length - 1];
  let style;
  if (realCPage === 1 || realCPage === lastPage) {
    style = paginateStyle.disabled;
  } else {
    style = paginateStyle.item;
  }

  return (
    <ul className={paginateStyle.container}>
      <li className={style} onClick={OnPrevious}>
        <div className={paginateStyle.arrowLeft} />
      </li>
      {paginationRange.map((pageNumber, i) => {
        if (pageNumber === DOTS) {
          return (
            <li key={i} className={paginateStyle.dots}>
              &#8230;
            </li>
          );
        }
        let styles =
          pageNumber === realCPage
            ? (paginateStyle.selected)
            : paginateStyle.item;

        return (
          <li
            key={i}
            className={styles}
            onClick={() => {
              // dispatch(
              //   fetchRecipes({ name: objrecipes.name, page: pageNumber - 1 })
              // );
              // const newPage = objrecipes.currentPage - 1;
              const newPage = pageNumber - 1;
              dispatch(paginateInternal({ newPage }));
            }}
          >
            {pageNumber}
          </li>
        );
      })}
      <li className={style} onClick={onNext}>
        <div className={paginateStyle.arrowRight} />
      </li>
    </ul>
  );
}

export default Paginate;
