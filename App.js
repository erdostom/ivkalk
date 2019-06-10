import React from 'react';
import { StyleSheet, Text, View, StatusBar, TextInput } from 'react-native';
import {FlingGestureHandler, Directions, State} from 'react-native-gesture-handler'
import Konstants from './Constants'


export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedGSM: 80,
      selectedSizeIndex: 2,
    }

  }


  incrementSize = () => {
    let target = 0
    if (this.state.selectedSizeIndex !== Konstants.sheetSizes.length - 1 ) {
      target = this.state.selectedSizeIndex + 1
    }
    this.setSize(target)
  }

  decrementSize = () => {
    let target = Konstants.sheetSizes.length - 1
    if (this.state.selectedSizeIndex !== 0 ) {
      target = this.state.selectedSizeIndex - 1
    }
    this.setSize(target)
  }

  setSize = (target) => {
    this.setState({
      ...this.state,
      selectedSizeIndex: target
    })
  }

  render() {
    _swipeSizeUp = ({nativeEvent}) => {
      if (nativeEvent.state === State.ACTIVE) {
        this.incrementSize()
      }
    }
    _swipeSizeDown = ({nativeEvent}) => {
      if (nativeEvent.state === State.ACTIVE) {
        this.incrementSize()
      }
    }
    return (
      <View style={styles.container}>
        <StatusBar barStyle='light-content' />
        <View style={styles.top}>
          <View style={styles.topTitle}>
            <Text style={styles.titleText}>Iv Kalk</Text>
          </View>
          <View style={styles.params}>
            <View style={styles.paramsLeft}>
              <Text style={styles.bottomText} onPress={() => console.log('zsumzsum')}>
                {this.state.selectedGSM}
              </Text>
              <Text style={styles.bottomSubText}>gsm</Text>
            </View>
            <FlingGestureHandler
              direction={Directions.RIGHT }
              onHandlerStateChange={_swipeSizeUp}
            >
                <FlingGestureHandler
                  direction={Directions.UP}
                  onHandlerStateChange={_swipeSizeUp}
                >
                    <FlingGestureHandler
                      direction={Directions.LEFT}
                      onHandlerStateChange={_swipeSizeDown}
                    >
                        <FlingGestureHandler
                          direction={Directions.DOWN}
                          onHandlerStateChange={_swipeSizeDown}
                        >
                            <View style={styles.paramsRight}>
                              <Text style={styles.bottomText}>
                                {Konstants.sheetSizes[this.state.selectedSizeIndex]['x']} x {Konstants.sheetSizes[this.state.selectedSizeIndex]['y']}
                              </Text>
                              <Text style={styles.bottomSubText}>mm</Text>
                            </View>
                          </FlingGestureHandler>
                        </FlingGestureHandler>
                      </FlingGestureHandler>
                    </FlingGestureHandler>
                  </View>
                  <View style={styles.topBody}>
                    <TextInput
                      style={styles.input}
                      autoCompleteType='off'
                      autoCorrect={false}
                      autoFocus={true}
                      keyboardType='numeric'
                    />
                      </View>
                    </View>
                  </View>
    );
  }
}

const borders = {
  borderColor: 'black',
  borderWidth: 1,
  borderStyle: 'solid',
}

const colors = {
  bordo: '#72253d',
  lgrey: '#e3e3e3',
  mgrey: '#a1a1a1',
  dmgrey: '#444',
  dgrey: '#222222',
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  top: {
    flex: 10,
  },
  topTitle: {
    flex: 1,
    backgroundColor: colors.bordo,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 5,
  },
  titleText: {
    color: '#fff',
    fontSize: 24,
  },
  topBody: {
    flex: 9,
  },
  input: {
    height: 50,
    borderWidth: 1,
  },
  params: {
    flex: 1,
    flexDirection: 'row',
  },
  paramsLeft: {
    flex: 1,
    backgroundColor: colors.dmgrey,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomText: {
    color: '#fff',
    fontSize: 36,
  },
  bottomSubText: {
    color: '#fff',
    fontSize: 12,
  },
  paramsRight: {
    backgroundColor: colors.dgrey,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});


