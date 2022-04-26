import * as React from 'react';
import {
  VirtualizedList,
  TouchableOpacity,
  Button,
  FlatList,
  StyleSheet,
  Text,
  View,
  Alert,
} from 'react-native';
import {useState,useEffect} from 'react';

// declare our function to load remote data
async function loadList(aurl, alist, asetlist) {
 // const [list, setlist] = useState([]);
  const response = await fetch(aurl); // read the remote data file via fetch 'await' blocks
  const names = await response.json(); // parse the returned json object

  // add the returned list to the existing list
  names.forEach((item) => {
    //For the user experience, can be annoying to save/load multiple items and have to manually deselect them
    item.selected = false;
    alist.push(item);
  });

  const newList = alist.map((item) => {
    return item;
  });
  asetlist(newList);
}

async function saveList(aurl, list) {
  const newList = [];
  list.forEach((item) => {
    if (item.selected) {
      newList.push(item);
    }
  });
  if (newList.length == 0) {
    Alert.alert(
      'Error!',
      'You cannot save an empty list, please select item(s)'
    );
  } else {
    // POST request using fetch with async/await
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newList),
    };
    const response = await fetch(aurl, requestOptions);
  }
}

export { loadList };
export { saveList };
