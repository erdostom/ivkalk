import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle='light-content' />
      <View style={styles.top}>
        <View style={styles.topTitle}>
          <Text style={styles.titleText}>Iv Kalk</Text>
        </View>
        <View style={styles.topBody}>
          <Text>BODY leFT</Text>
        </View>
      </View>
      <View style={styles.bottom}>
        <View style={styles.bottomLeft}>
          <Text style={styles.bottomText}>150</Text>
          <Text style={styles.bottomSubText}>gsm</Text>
        </View>
        <View style={styles.bottomRight}>
          <Text style={styles.bottomText}>64 x 90</Text>
          <Text style={styles.bottomSubText}>cm</Text>
        </View>
      </View>
    </View>
  );
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
    flexDirection: 'row',
  },
  bottom: {
    flex: 1,
    flexDirection: 'row',
  },
  bottomLeft: {
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
  bottomRight: {
    backgroundColor: colors.dgrey,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});

