import { components, NonceProvider } from 'react-select'
import { flatten, length, prop } from 'ramda'
import { selectBorderColor, selectFocusBorderColor } from '../helper'
import { sharedSelect } from '../SelectInput/template'
import CreatableSelect from 'react-select/creatable'
import React from 'react'
import styled from 'styled-components'

const StyledCreatableSelect = styled(CreatableSelect)`
  ${sharedSelect}

  ${({ bgColor, borderColor, focusedBorderColor, isMulti }) =>
    !isMulti &&
    `    
    .bc__value-container {
      cursor: text;
      > div {
        width: 100%;
      }
    }

    .bc__clear-indicator {
      display: none;
    }

    .bc__indicator-separator {
      display: none;
    }
  `}

  ${props =>
    // @ts-ignore
    props.isOptionsEmpty &&
    `
    .bc__dropdown-indicator {
      display: none;
    }
  `}
`

const MultiValueContainer = props => {
  return (
    <components.MultiValueContainer {...props}>
      {props.selectProps.multiValueContainer
        ? props.selectProps.multiValueContainer(props)
        : props.children}
    </components.MultiValueContainer>
  )
}

const getComponents = isMulti =>
  isMulti
    ? {
        DropdownIndicator: null,
        MultiValueContainer
      }
    : { MultiValueContainer }

const CreatableInput = props => {
  const {
    autoFocus,
    errorState,
    handleBlur,
    handleChange,
    handleInputChange,
    handleKeyDown,
    height,
    inputValue,
    isMulti,
    isValidNewOption,
    menuIsOpen,
    multiValueContainer,
    noOptionsMessage,
    openMenuOnClick,
    options,
    placeholder,
    value
  } = props

  const flatOptions = !isMulti && flatten(options.map(prop('options')))
  const isOptionsEmpty = !isMulti && !length(flatOptions)

  return (
    <NonceProvider nonce={window.NONCE}>
      <StyledCreatableSelect
        autoFocus={autoFocus}
        borderColor={selectBorderColor(errorState)}
        classNamePrefix='bc'
        components={getComponents(isMulti)}
        focusedBorderColor={selectFocusBorderColor(errorState)}
        height={height}
        indicatorSeparator={null}
        inputValue={inputValue}
        isClearable
        isMulti={isMulti}
        isOptionsEmpty={isOptionsEmpty}
        menuIsOpen={menuIsOpen}
        onBlur={handleBlur}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onInputChange={handleInputChange}
        openMenuOnClick={openMenuOnClick}
        options={options}
        placeholder={placeholder}
        value={value}
        // Components
        noOptionsMessage={noOptionsMessage}
        isValidNewOption={isValidNewOption}
        multiValueContainer={multiValueContainer}
      />
    </NonceProvider>
  )
}

export default CreatableInput
