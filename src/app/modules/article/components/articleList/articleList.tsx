import React from 'react';

import './articleList.scss';

import generateUid from '../../../../common/uid';
import { has, isNullOrUndefined } from '../../../../common/utils';

import { ArticleItem, SortOrder } from '../../types';
import { filterAndSortArticles } from '../../utils';

import { SelectableItem } from '../dropdown/types';
import { TagItem } from '../tags/types';
import { PageInfo } from '../paginator/types';

import Dropdown from '../dropdown/dropdown';
import Search from '../search/search';
import Checkbox from '../checkbox/checkbox';
import Tags from '../tags/tags';
import Article from '../articleItem/articleItem';
import Paginator from '../paginator/paginator';

type ArticleListProps = {
    items: Array<ArticleItem>;
};

type ArticleListState = {
    displayedArticles: Array<ArticleItem>;
    activeTags: Array<TagItem>;
    displayArchieved: boolean;
    searchQuery: string;
    pageInfo?: PageInfo;
    sortOrder?: SortOrder<ArticleItem>;
};

export default function ArticleList(props: ArticleListProps): JSX.Element {
    const [state, setState] = React.useState<ArticleListState>({
        displayedArticles: props.items,
        activeTags: [],
        displayArchieved: false,
        searchQuery: '',
        sortOrder: { fieldName: 'postedAt', order: 'desc' }
    });

    const onDisplayArchievedToggle = React.useCallback(
        (displayArchieved: boolean): void => {
            setState({
                ...state,
                displayArchieved: displayArchieved,
                displayedArticles: filterAndSortArticles(props.items, displayArchieved, state.activeTags, state.searchQuery, state.pageInfo, state.sortOrder)
            });
        }, [state, props.items]);

    const onSearchQueryChange = React.useCallback(
        (searchQuery: string): void => {
            setState({
                ...state,
                searchQuery: searchQuery
            })
        }, [state]);

    const onSearchClick = React.useCallback(
        (): void => {
            setState({
                ...state,
                displayedArticles: filterAndSortArticles(props.items, state.displayArchieved, state.activeTags, state.searchQuery, state.pageInfo, state.sortOrder)
            })
        }, [state, props.items]);

    const onSortOrderChange = React.useCallback(
        (sortOrder: SortOrder<ArticleItem>): void => {
            if (!isNullOrUndefined(sortOrder)) {
                setState({
                    ...state,
                    sortOrder: sortOrder,
                    displayedArticles: filterAndSortArticles(props.items, state.displayArchieved, state.activeTags, state.searchQuery, state.pageInfo, sortOrder)
                });
            }
        }, [state, props.items]);

    const onTagAdd = React.useCallback(
        (tag: TagItem) => {
            if (!isNullOrUndefined(tag)) {
                const tags: Array<TagItem> =
                    has(state.activeTags, tag)
                        ? state.activeTags
                        : [...state.activeTags, tag];

                setState({
                    ...state,
                    activeTags: tags,
                    displayedArticles: filterAndSortArticles(props.items, state.displayArchieved, tags, state.searchQuery, state.pageInfo, state.sortOrder)
                });
            }
        }, [state, props.items]);

    const onTagRemove = React.useCallback(
        (tag: TagItem) => {
            if (!isNullOrUndefined(tag)) {
                const tags: Array<TagItem> =
                    has(state.activeTags, tag)
                        ? state.activeTags.filter(x => x !== tag)
                        : state.activeTags;

                setState({
                    ...state,
                    activeTags: tags,
                    displayedArticles: filterAndSortArticles(props.items, state.displayArchieved, tags, state.searchQuery, state.pageInfo, state.sortOrder)
                });
            }
        }, [state, props.items]);

    const onPageChange = React.useCallback(
        (pageInfo: PageInfo): void => {
            if (!isNullOrUndefined(pageInfo)) {
                setState({
                    ...state,
                    pageInfo: pageInfo,
                    displayedArticles: filterAndSortArticles(props.items, state.displayArchieved, state.activeTags, state.searchQuery, pageInfo, state.sortOrder)
                });
            }
        }, [state, props]);

    return (
        <section className="article-list">
            <section className="article-list__filters">
                <section>
                    <OrderDropdown
                        onSortOrderChange={onSortOrderChange}
                    />
                    <Search
                        query={state.searchQuery}
                        onSearchQueryChange={onSearchQueryChange}
                        onSearchClick={onSearchClick}
                    />
                    <Checkbox
                        label='Display archieved'
                        value={state.displayArchieved}
                        onChange={onDisplayArchievedToggle}
                    />
                </section>
                <div>
                    <Tags
                        tags={state.activeTags}
                        onDelete={onTagRemove}
                    />
                </div>
            </section>
            <section className="article-list__items">
                {state.displayedArticles.map(article =>
                    <Article
                        key={article.id}
                        article={article}
                        onTagClick={onTagAdd}
                    />
                )}
            </section>
            <div className="article-list__paginator">
                <Paginator
                    itemsCount={props.items.length}
                    onPageChange={onPageChange}
                />
            </div>
        </section>
    );
}

const orderOptions: Array<SelectableItem> = [
    { id: generateUid(), displayValue: 'Date', args: { fieldName: 'postedAt', order: 'desc' } },
    { id: generateUid(), displayValue: 'Date', args: { fieldName: 'postedAt', order: 'asc' } },
    { id: generateUid(), displayValue: 'Popularity', args: { fieldName: 'stats.views', order: 'desc' } },
    { id: generateUid(), displayValue: 'Popularity', args: { fieldName: 'stats.views', order: 'asc' } },
];

const orderOptionTemplateData: Map<string, string> =
    new Map(orderOptions.map(({ id }, index) =>
        [id, index % 2 === 0 ? 'fa-sort-amount-down-alt' : 'fa-sort-amount-up-alt']));

const OrderDropdown = (props: {
    onSortOrderChange: (sortOrder: SortOrder<ArticleItem>) => void;
}): JSX.Element => {
    const displayValueTemplateGenerator = React.useCallback(
        (item: SelectableItem): JSX.Element => {
            return (
                <>
                    <i className={`fas ${orderOptionTemplateData.get(item.id)}`} aria-hidden="true"></i>{item.displayValue}
                </>
            );
        }, []);

    const onSortOrderChange = React.useCallback
        ((item?: SelectableItem): void => {
            if (!isNullOrUndefined(item) && !isNullOrUndefined(item.args)) {
                props.onSortOrderChange({
                    fieldName: item.args['fieldName'],
                    order: item.args['order']
                });
            }
        }, [props]);

    return (
        <Dropdown
            caption='Please select'
            canDeselect={false}
            items={orderOptions}
            onItemSelect={onSortOrderChange}
            selectedItem={orderOptions[0]}
            displayValueTemplateGenerator={displayValueTemplateGenerator}
        />
    );
};