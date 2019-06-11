import React from 'react';
import { StyleSheet, Text, View, StatusBar, TextInput } from 'react-native';
import {FlingGestureHandler, Directions, State} from 'react-native-gesture-handler'
import Konstants from './Constants'


export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedGSMIndex: 4,
      selectedSizeIndex: 2,
      mode1: 'iv',
      mode2: 'kg',
      value1: '',
      value2: ''
    }

  }


  incrementGSM = () => {
    let target = 0
    if (this.state.selectedGSMIndex !== Konstants.gsms.length - 1 ) {
      target = this.state.selectedGSMIndex + 1
    }
    this.setGSM(target)
  }

  decrementGSM = () => {
    let target = Konstants.gsms.length - 1
    if (this.state.selectedGSMIndex !== 0 ) {
      target = this.state.selectedGSMIndex - 1
    }
    this.setGSM(target)
  }

  setGSM = (target) => {
    this.setState({
      ...this.state,
      selectedGSMIndex: target
    })
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

  setValue1 = e => this.setState({...this.state, value1: e})
  setValue2 = e => this.setState({...this.state, value2: e})

  render() {
    let calcValue
    let sumValue

    _toggleMode1 = () => {
      if (this.state.mode1 === 'kg') { 
        this.setState({...this.state, mode1: 'iv'}) 
      } else {
        this.setState({...this.state, mode1: 'kg'})
      }
    }

    _toggleMode2 = () => {
      if (this.state.mode2 === 'kg') { 
        this.setState({...this.state, mode2: 'iv'}) 
      } else {
        this.setState({...this.state, mode2: 'kg'})
      }
    }

    _swipeGSMUp = ({nativeEvent}) => {
      if (nativeEvent.state === State.ACTIVE) {
        this.incrementGSM()
      }
    }
    _swipeGSMDown = ({nativeEvent}) => {
      if (nativeEvent.state === State.ACTIVE) {
        this.decrementGSM()
      }
    }

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

    getGSM = Konstants.gsms[this.state.selectedGSMIndex]
    getSizeX = Konstants.sheetSizes[this.state.selectedSizeIndex]['x']
    getSizeY = Konstants.sheetSizes[this.state.selectedSizeIndex]['y']

    formattedNumber = number => number.toFixed(0).replace(/\d(?=(\d{3})+$)/g, '$&.')

    if (this.state.mode1 === 'iv') {
      calcValue = getGSM * getSizeX * getSizeY / 1000000000 * this.state.value1
      if (this.state.mode2 === 'iv') {
        sumValue = this.state.value1 * this.state.value2
      } else {
        sumValue = calcValue * this.state.value2
      }
    } else {
      calcValue = this.state.value1 / (getGSM * getSizeX * getSizeY / 1000000000)
      if (this.state.mode2 === 'iv') {
        sumValue = calcValue * this.state.value2
      } else {
        sumValue = this.state.value1 * this.state.value2
      }
    }

    return (
      <View style={styles.container}>
        <StatusBar barStyle='light-content' />
        <View style={styles.top}>
          <View style={styles.topTitle}>
            <Text style={styles.titleText}>Ív Kalk</Text>
          </View>
          <View style={styles.params}>
            <FlingGestureHandler
              direction={Directions.RIGHT }
              onHandlerStateChange={_swipeGSMUp}
            >
                <FlingGestureHandler
                  direction={Directions.UP}
                  onHandlerStateChange={_swipeGSMUp}
                >
                    <FlingGestureHandler
                      direction={Directions.LEFT}
                      onHandlerStateChange={_swipeGSMDown}
                    >
                        <FlingGestureHandler
                          direction={Directions.DOWN}
                          onHandlerStateChange={_swipeGSMDown}
                        >
                            <View style={styles.paramsLeft}>
                              <Text style={styles.bottomText}>
                                {getGSM}
                              </Text>
                              <Text style={styles.bottomSubText}>gsm</Text>
                            </View>
                          </FlingGestureHandler>
                        </FlingGestureHandler>
                      </FlingGestureHandler>
                    </FlingGestureHandler>
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
                                        {getSizeX} x {getSizeY}
                                      </Text>
                                      <Text style={styles.bottomSubText}>mm</Text>
                                    </View>
                                  </FlingGestureHandler>
                                </FlingGestureHandler>
                              </FlingGestureHandler>
                            </FlingGestureHandler>
                          </View>
                          <View style={styles.body}>
                            <View style={styles.bodyRow}>
                              <Text style={styles.label} onPress={_toggleMode1}>
                                {this.state.mode1 === 'iv' ? 'ÍV' : 'SÚLY'}
                              </Text>
                              <TextInput
                                style={styles.input}
                                onChangeText={this.setValue1}
                                value={this.state.value1}
                                autoCompleteType='off'
                                autoCorrect={false}
                                autoFocus={true}
                                clearButtonMode='always'
                                keyboardType='numeric' />
                              </View>
                              <View style={styles.resultRow}>
                                <Text style={styles.resultLabel} onPress={_toggleMode1}>
                                  {this.state.mode1 !== 'iv' ? 'ÍV' : 'SÚLY'}
                                </Text>
                                <Text style={styles.resultText}>{formattedNumber(calcValue)}</Text>
                              </View>
                              <View style={styles.bodyRow}>
                                <Text style={styles.label} onPress={_toggleMode2}>
                                  {this.state.mode2 === 'iv' ? 'HUF / ív' : 'HUF / kg'}
                                </Text>
                                <TextInput
                                  style={styles.input}
                                  onChangeText={this.setValue2}
                                  value={this.state.value2}
                                  autoCompleteType='off'
                                  autoCorrect={false}
                                  clearButtonMode='always'
                                  keyboardType='numeric' />
                                </View>
                                <View style={styles.resultRow}>
                                  <Text style={styles.resultLabel}>HUF</Text>
                                  <Text style={styles.resultText}>{formattedNumber(sumValue)}</Text>
                                </View>
                                <View style={styles.keyboardRow} />
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
  body: {
    flex: 9,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    alignContent: 'flex-start',
  },
  bodyRow: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: colors.lgrey,
  },
  resultRow: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    backgroundColor: colors.bordo,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
  resultLabel: {
    flex: 1,
    color: '#eee',
    fontSize: 32,
  },
  resultText: {
    flex: 2,
    color: '#eee',
    textAlign: 'center',
    fontSize: 40,
  },
  input: {
    flex: 2,
    height: 50,
    fontSize: 32,
    backgroundColor: colors.mgrey,
  },
  label: {
    flex: 2,
    fontSize: 32,
    // fontWeight: '800',
  },
  blankspace: {
    flex: 1,
  },
  keyboardRow: {
    flex: 5,
    backgroundColor: colors.dmgrey,
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
    fontSize: 24,
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


