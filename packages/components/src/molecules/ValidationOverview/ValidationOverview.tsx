import {Colors} from '@/styles/Colors';
import {CloseOutlined} from '@ant-design/icons';
import {getRuleForResult} from '@monokle/validation';
import {Collapse, Select, Skeleton} from 'antd';
import {useEffect, useMemo, useState} from 'react';
import styled from 'styled-components';
import {CollapseItemRow} from './CollapseItemRow';
import {DEFAULT_FILTERS_VALUE, newErrorsTextMap} from './constants';
import {useCurrentAndNewProblems, useFilteredProblems} from './hooks';
import {BaseDataType, FiltersValueType, ShowByFilterOptionType, ValidationOverviewType} from './types';
import {getItemRowId} from './utils';

import {ValidationCollapsePanelHeader} from './ValidationCollapsePanelHeader';
import ValidationOverviewFilters from './ValidationOverviewFilters';

let baseData: BaseDataType = {
  baseActiveKeys: [],
  baseShowByFilterValue: 'show-by-file',
  baseShowOnlyByResource: false,
};

const ValidationOverview: React.FC<ValidationOverviewType> = props => {
  const {containerClassName = '', containerStyle = {}, height, width, selectedProblem, status} = props;
  const {showOnlyByResource} = props;
  const {customMessage, newProblemsIntroducedType, skeletonStyle = {}, validationResponse, onProblemSelect} = props;

  const [activeKeys, setActiveKeys] = useState<string[]>([]);
  const [filtersValue, setFiltersValue] = useState<FiltersValueType>(DEFAULT_FILTERS_VALUE);
  const [searchValue, setSearchValue] = useState('');
  const [showByFilterValue, setShowByFilterValue] = useState<ShowByFilterOptionType>(baseData.baseShowByFilterValue);
  const [showNewErrors, setShowNewErrors] = useState(false);
  const [showNewErrorsMessage, setShowNewErrorsMessage] = useState(true);

  const {newProblems, problems} = useCurrentAndNewProblems(showByFilterValue, validationResponse);
  const filteredProblems = useFilteredProblems(problems, newProblems, showNewErrors, searchValue, filtersValue);

  const showByFilterOptions = useMemo(
    () => [
      {value: 'show-by-file', label: 'Show by file', disabled: showOnlyByResource},
      {value: 'show-by-resource', label: 'Show by resource'},
      {value: 'show-by-rule', label: 'Show by rule', disabled: showOnlyByResource},
    ],
    [showOnlyByResource]
  );

  useEffect(() => {
    if (typeof showOnlyByResource === 'undefined') {
      return;
    }

    if (showOnlyByResource === true) {
      if (showByFilterValue !== 'show-by-resource') {
        setShowByFilterValue('show-by-resource');
      }

      if (baseData.baseShowOnlyByResource === false) {
        baseData.baseActiveKeys = [];
      }
    } else if (!showOnlyByResource) {
      setShowByFilterValue(baseData.baseShowByFilterValue);

      if (baseData.baseShowOnlyByResource === true) {
        baseData.baseActiveKeys = [];
      }
    }

    baseData.baseShowOnlyByResource = showOnlyByResource;
  }, [showOnlyByResource]);

  useEffect(() => {
    if (!showNewErrorsMessage) {
      setShowNewErrorsMessage(true);
    }
  }, [newProblems]);

  useEffect(() => {
    setActiveKeys(baseData.baseActiveKeys.length ? baseData.baseActiveKeys : Object.keys(filteredProblems));
  }, [filteredProblems]);

  useEffect(() => {
    if (searchValue) {
      setSearchValue('');
    }
  }, [problems]);

  if (status === 'loading') {
    return <Skeleton active style={skeletonStyle} />;
  }

  return (
    <MainContainer style={containerStyle} $height={height} $width={width} className={containerClassName}>
      <ValidationOverviewFilters
        filtersValue={filtersValue}
        searchValue={searchValue}
        onFiltersChange={filters => setFiltersValue(filters)}
        onSearch={value => setSearchValue(value)}
      />

      <ActionsContainer $secondary>
        {Object.keys(newProblems.data).length && showNewErrorsMessage && newProblemsIntroducedType !== 'initial' ? (
          <>
            {showNewErrors ? (
              <ShowNewErrorsButton onClick={() => setShowNewErrors(false)}>Show all</ShowNewErrorsButton>
            ) : (
              <NewErrorsMessage>
                {newProblemsIntroducedType ? newErrorsTextMap[newProblemsIntroducedType] : customMessage ?? ''}{' '}
                <b>{newProblems.resultsCount} errors</b> introduced.{' '}
                <ShowNewErrorsButton onClick={() => setShowNewErrors(true)}>Show only those</ShowNewErrorsButton>
                <CloseIcon onClick={() => setShowNewErrorsMessage(false)} />
              </NewErrorsMessage>
            )}
          </>
        ) : (
          <div />
        )}

        <ShowByFilter
          value={showByFilterValue}
          dropdownMatchSelectWidth={false}
          bordered={false}
          options={showByFilterOptions}
          onSelect={(value: any) => {
            setShowByFilterValue(value);
            baseData.baseShowByFilterValue = value;
            baseData.baseActiveKeys = [];
          }}
        />
      </ActionsContainer>

      {Object.keys(filteredProblems).length ? (
        <>
          <ValidationsCollapse
            activeKey={activeKeys}
            ghost
            onChange={keys => {
              const changedKeys = typeof keys === 'string' ? [keys] : keys;

              setActiveKeys(changedKeys);
              baseData.baseActiveKeys = changedKeys;
            }}
          >
            {Object.entries(filteredProblems).map(([id, results]) => (
              <Collapse.Panel
                header={
                  <ValidationCollapsePanelHeader id={id} results={results} showByFilterValue={showByFilterValue} />
                }
                key={id}
              >
                {results.map((result, i) => {
                  const rule = getRuleForResult(validationResponse, result);

                  return (
                    <CollapseItemRow
                      key={getItemRowId(result, i)}
                      result={result}
                      rule={rule}
                      showByFilterValue={showByFilterValue}
                      selectedProblem={selectedProblem}
                      onClick={() => {
                        if (onProblemSelect) {
                          onProblemSelect({
                            problem: result,
                            selectedFrom: showByFilterValue === 'show-by-resource' ? 'resource' : 'file',
                          });
                        }
                      }}
                    />
                  );
                })}
              </Collapse.Panel>
            ))}
          </ValidationsCollapse>

          {showNewErrors && (
            <ActionsContainer>
              <ShowNewErrorsButton onClick={() => setShowNewErrors(false)}>Show all</ShowNewErrorsButton>
            </ActionsContainer>
          )}
        </>
      ) : (
        <NoErrorsMessage>No problems found.</NoErrorsMessage>
      )}
    </MainContainer>
  );
};

export default ValidationOverview;

// Styled components

const ActionsContainer = styled.div<{$secondary?: boolean}>`
  display: grid;
  grid-template-columns: ${({$secondary}) => ($secondary ? 'max-content max-content' : '1fr max-content')};
  /* grid-gap: 16px; */

  ${({$secondary}) => {
    if ($secondary) {
      return 'margin-top: 16px; justify-content: space-between; align-items: center;';
    }
  }}
`;

const CloseIcon = styled(CloseOutlined)`
  transform: translateY(1px);
  color: ${Colors.grey8};
  cursor: pointer;
  margin-left: 12px;
  transition: all 0.3s;

  &:hover {
    color: ${Colors.grey7};
  }
`;

const MainContainer = styled.div<{$height?: number; $width?: number}>`
  background-color: #191f21;
  height: ${({$height}) => ($height ? `${$height}px` : '100%')};
  width: ${({$width}) => ($width ? `${$width}px` : '100%')};
  display: flex;
  flex-direction: column;
`;

const NewErrorsMessage = styled.div`
  background-color: rgba(222, 68, 81, 0.15);
  border-radius: 2px;
  padding: 1px 8px;
  color: ${Colors.red7};
`;

const NoErrorsMessage = styled.div`
  color: ${Colors.grey9};
  padding: 16px;
  font-weight: 700;
`;

const ShowByFilter = styled(Select)`
  margin-right: -10px;

  & .ant-select-arrow {
    color: ${Colors.blue7};
  }

  & .ant-select-selection-item {
    color: ${Colors.blue7} !important;
  }
`;

const ShowNewErrorsButton = styled.span`
  width: max-content;
  padding: 1px 0px;
  color: ${Colors.blue7};
  margin-left: 6px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    color: ${Colors.blue6};
  }
`;

const ValidationsCollapse = styled(Collapse)`
  overflow-y: auto;
  overflow-x: hidden;
  margin-top: 16px;
  width: 100%;

  & .ant-collapse-header {
    color: ${Colors.grey8} !important;
    padding-left: 0px !important;
    padding-bottom: 0px !important;

    &:first-child {
      padding-top: 0px;
    }

    &-text {
      display: flex;
      align-items: center;
    }
  }

  & .ant-collapse-item {
    margin-bottom: 8px;
  }

  & .ant-collapse-item-active {
    margin-bottom: 0px;
  }

  & .ant-collapse-content-box {
    padding: 10px 0px 15px 0px !important;
  }
`;
