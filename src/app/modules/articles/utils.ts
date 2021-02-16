import { getValueByPath, hasIn, isNullOrEmpty, isNullOrUndefined } from "../../common/utils";

import { ArticleItem, SortOrder } from "./types";

import { TagItem } from "./components/tags/types";
import { PageInfo } from "./components/paginator/types";

const defaultArticleComparator = (_: ArticleItem, __: ArticleItem): number => {
    return 1;
};

const getSortComparatorFunc = (sortOrder: SortOrder<ArticleItem>)
    : (curr: ArticleItem, prev: ArticleItem) => number => {
    return (curr: ArticleItem, prev: ArticleItem): number => {
        const currValue: any = getValueByPath(curr, sortOrder.fieldName);
        const prevValue: any = getValueByPath(prev, sortOrder.fieldName);

        const sortResult: number =
            currValue === prevValue
                ? 0
                : currValue > prevValue ? 1 : -1

        return sortResult * (sortOrder.order === 'asc' ? 1 : -1);
    };
};

export const filterAndSortArticles = (
    items: Array<ArticleItem>,
    displayArchieved: boolean,
    activeTags: Array<TagItem>,
    searchQuery: string,
    sortOrder?: SortOrder<ArticleItem>,
): Array<ArticleItem> => {
    const sortComparatorFunc = isNullOrUndefined(sortOrder)
        ? defaultArticleComparator
        : getSortComparatorFunc(sortOrder);

    return [...items]
        .filter(x => displayArchieved || !x.isArchieved)
        .filter(x => activeTags.length === 0 || hasIn(activeTags, x.tags))
        .filter(x => isNullOrEmpty(searchQuery) || x.name.toLowerCase().includes(searchQuery.toLowerCase()))
        .sort((curr, prev) => sortComparatorFunc(curr, prev))
    ;
};

export const getPageItems = (items: Array<ArticleItem>, pageInfo?: PageInfo): Array<ArticleItem> => {
    if (isNullOrUndefined(pageInfo) || items.length < pageInfo.start
    ) {
        return items;
    }

    return items.slice(pageInfo.start, pageInfo.end);
};