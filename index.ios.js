/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var _ = require('lodash');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} = React;

var SixteenPuzzle = React.createClass({

  componentWillMount: function () {
    var board = _(16).times(function (index) {
      return {label: index, index: index, empty: index === 15};
    }).shuffle().chunk(4).value();

    this.setState({
      board: board,
      selected: null
    });
  },

  swap: function (row, column) {
    console.log('selected', this.state.selected);
    if (this.state.selected === null) {
      this.state.selected = {
        row: row,
        column: column
      };
    } else if (this.state.selected.row == row && this.state.selected.column == column) {
      this.state.selected = null;
    } else if (this.state.board[row][column].empty) {
      var tmp = this.state.board[row][column];
      this.state.board[row][column] = this.state.board[this.state.selected.row][this.state.selected.column];
      this.state.board[this.state.selected.row][this.state.selected.column] = tmp;
      this.state.selected = null;
    } else {
      this.state.selected = null;
      return;
    }
    this.setState(this.state);
  },
  render: function() {
    var swap = this.swap;

    var won = this.hasWon();

    if (won) {
      alert('you won');
    }

    var rows = this.state.board.map((columns, row) =>
      <View style={styles.row} key={'row' + row}>
        {columns.map((value, column) =>
          <TouchableHighlight
            underlayColor='transparent'
            key={row + ',' + column}
            onPress={() => swap(row, column)}>
            <View style={[styles.column, {backgroundColor: value.empty ? 'red' : 'transparent'}]}>
              <Text style={styles.text}>{value.empty ? 'X' : value.label}</Text>
            </View>
          </TouchableHighlight>
        )}
      </View>
    );

    return (
      <View style={styles.container}>
        <View style={styles.board}>
          {rows}
        </View>
      </View>
    );
  },

  hasWon: function () {
    var flat = _.flatten(this.state.board);
    for (var i = 0; i < flat.length - 1; i++) {
      if (flat[i] + 1 !== flat[i + 1].index) {
        return false;
      }
    }
    return true;
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  board: {
    padding: 5,
    backgroundColor: 'transparent',
    borderRadius: 10
  },
  row: {
    flexDirection: 'row',
    rotation: 180
  },
  column: {
    width: 80,
    height: 80,
    borderRadius: 5,
    borderColor: 'grey',
    borderWidth: 2,
    margin: 5,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24
  }
});

AppRegistry.registerComponent('SixteenPuzzle', () => SixteenPuzzle);
