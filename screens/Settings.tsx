import React from 'react';
import {View, Switch} from 'react-native';
import * as StylesModule from '../components/stylesheet';
import {FileManager, SETTINGS_STORAGE_KEY} from '../helpers/FileManager';
import {ClockFaceAppContext} from '../helpers/AppContextProvider';
import {settingsPage} from '../components/stylesheet';

export class SettingsScreen extends React.Component {
  state = {
    analogClockFace: false,
  };

  //Any settings that change here need to be written back to storage
  _WriteSettingsToFile = () => {
    let NewSettingsPayload = {
      analogClockFace: this.state.analogClockFace,
    };

    FileManager.WriteJSONToDisk(
      SETTINGS_STORAGE_KEY,
      NewSettingsPayload,
      false,
    ).catch((error) => {
      console.log(error);
    });
  };

  // Start here so we can send our JSON object to the Settings screen after retrieval
  _SettingsInit = async () => {
    // Let our file manager resolve the promise
    const Context = React.useContext(ClockFaceAppContext);
    this.setState({analogClockFace: Context.AnalogClockValue}, () => {});

    await FileManager.ReadJSONData(SETTINGS_STORAGE_KEY)
      .then((token) => {
        if (token != null) {
          this.setState({analogClockFace: token.analogClockFace});
          console.log(
            '[INIT] Set analogClockFace to ' + this.state.analogClockFace,
          );
        }
      })
      .catch((error) => {
        console.error('Error Loading in Settings: ' + error);
      });
  };

  componentDidMount = () => {
    this._SettingsInit();
  };

  componentWillUnMount = () => {
    this._WriteSettingsToFile();
  };

  render() {
    return (
      <StylesModule.SafeAreaView>
        <View style={settingsPage.rowStyle}>
          <StylesModule.ScrollView>
            <ClockFaceAppContext.Consumer>
              {({AnalogClockValue, setClockFaceValue}) =>
                SettingSwitchItem(
                  'Use Analog Clock',
                  AnalogClockValue,
                  (value) => {
                    // If it was set to true, then set it back to false
                    this.setState({analogClockFace: value}, () => {
                      console.log(
                        'New State: analogClockFace ' +
                          this.state.analogClockFace,
                      );

                      // Write settings to file
                      this._WriteSettingsToFile();

                      // Force the context to update the state
                      setClockFaceValue();
                    });
                  },
                )
              }
            </ClockFaceAppContext.Consumer>
          </StylesModule.ScrollView>
        </View>
      </StylesModule.SafeAreaView>
    );
  }
}

// Allows the creation of switch items
export const SettingSwitchItem = (
  label: string,
  value: boolean,
  onValueChange: (value: boolean) => void,
) => {
  return (
    <View style={settingsPage.styleModule}>
      <StylesModule.Text style={{transform: [{scale: 1.1}]}}>
        {label}
      </StylesModule.Text>
      <Switch
        value={value}
        onValueChange={onValueChange}
        style={{transform: [{scale: 1.5}]}}
      />
    </View>
  );
};

export default SettingsScreen;
