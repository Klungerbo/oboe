import React, { useEffect } from 'react'
import SearchIcon from '@material-ui/icons/Search';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSearchTerm } from '../../store/actions/DataActions';
import { InputBase } from '@material-ui/core';
import { useStyles, StyledSearchBar, StyledSearchIconContainer } from './SearchbarStyled';

/**
 * Oboe search bar.
 *
 * @param {*} props - (enableOnPaths) the paths to enable the search bar on.
 * @returns jsx of the search bar to be rendered, or null if it is to be hidden.
 */
export default function SearchBar(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const pathname = useLocation().pathname;

  const [searchInputEnabled, setSearchInputEnabled] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [previousPath, setPreviousPath] = React.useState("");

  /**
   * Manages visibility and state of the search bar based on user log in
   * as well as current path.
   */
  useEffect(() => {
    const foundPath = props.enableOnPaths.find(p => pathname === p);

    if (foundPath) {
      setSearchInputEnabled(true);

      if (foundPath !== previousPath) {
        dispatch(setSearchTerm(""));
        setSearchQuery("");
        setPreviousPath(foundPath);
      }
    } else {
      dispatch(setSearchTerm(""));
      setSearchQuery("");
      setSearchInputEnabled(false)
    }
  }, [pathname, props.enableOnPaths, dispatch, previousPath]);

  if (!searchInputEnabled)
    return null;

  return (
    <StyledSearchBar>
      <StyledSearchIconContainer>
        <SearchIcon />
      </StyledSearchIconContainer>

      <InputBase
        placeholder="Search…"
        value={searchQuery}
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          dispatch(setSearchTerm(e.target.value));
        }}
        inputProps={{ 'aria-label': 'search' }}
      />
    </StyledSearchBar >
  );
}