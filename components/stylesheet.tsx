/* eslint-disable prettier/prettier */
//Disabled prettier for this file due to some 
import {StyleSheet} from 'react-native';
import styled from 'styled-components/native';

export const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginLeft: 25,
    // marginRight: 25,
  },
  centered_bound: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    // paddingLeft: 25,
    // marginLeft: 20,
  },
  centered: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flex_centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  TimerSVG: {
    width: 250,
    height: 80,
    // paddingLeft: 10,
    // paddingRight: 10,
    // justifyContent: 'space-between',
    alignItems: 'center',
  },
  TimerContainer: {
    // paddingLeft: 10,
    // paddingRight: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
  },
  TimerScroll: {
    paddingTop: 10,
    flexGrow: 1,
    flex: 1,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  AddButtonBottom: {
    justifyContent: 'flex-end',
    marginBottom: 36,
    marginTop: 20,
  },
});

export const ScrollView = styled.ScrollView`
  flex: 1;
  background-color: ${({theme}) => theme.bgColor};
`;

export const SafeAreaView = styled.SafeAreaView`
  background-color: ${({theme}) => theme.bgColor};
  flex: 1;
`;

export const View = styled.View`
  background-color: ${({theme}) => theme.bgColor};
`;

export const Text = styled.Text`
  color: ${({theme}) => theme.primaryColor};
`;

export const StatusBar = styled.StatusBar.attrs(({theme}) => ({
  barStyle: theme.style === 'dark' ? 'light-content' : 'dark-content',
}))``;

export const TextInput = styled.TextInput`
  marginTop: 20px;
  width: 100px;
  height: 40px;
  marginLeft: 20px;
  marginRight: 20px;
  paddingHorizontal: 10px;
  borderRadius: 50px;
  backgroundColor: #DCDCDC;
`;

export const BackgroundText = styled.Text`
  color: ${({theme}) => theme.primaryColor};
`;
