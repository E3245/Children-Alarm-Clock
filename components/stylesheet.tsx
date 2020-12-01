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

export const digitalStyle = StyleSheet.create({
  container: {
    // justifyContent: 'center',
    flex: 1,
    paddingTop: 10,
    marginTop: 20,
    // alignItems: 'center',
    borderBottomColor: '#000000',
    borderBottomWidth: 1,
  },
  dClock: {
    marginTop: 5,
    paddingVertical: 4,
    padding: 40,
    borderWidth: 4,
    borderColor: '#20232a',
    borderRadius: 6,
    backgroundColor: '#059033' /*{color} */,
    color: '#20232a',
    textAlign: 'center',
    // alignItems: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    flexDirection: 'row',
    flexWrap: 'wrap',
    // justifyContent: 'space-between',
  },
  timeText: {
    fontSize: 30,
    color: '#000000',
  },
  daysText: {
    color: '#000000',
    fontSize: 25,
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#000000',
    borderBottomWidth: 1,
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

export const agenda = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
    textAlign: 'center',
  },
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
});

export const settingsPage = StyleSheet.create({
  rowStyle: {flexDirection: 'row'},
  styleModule: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
});

export const splashStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  viewStyles: {
    backgroundColor: '#00853E',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  teamName: {
    color: 'white',
    fontSize: 60,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Montserrat',
  },
  projectName: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Montserrat',
  },
  teamMembers: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Open Sans',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  UNTLogo: {
    width: '100%',
    height: 200,
  },
});
