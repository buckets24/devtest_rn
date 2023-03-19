/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import Voice, {SpeechResultsEvent} from '@react-native-voice/voice';
import {RecordButton} from './src/components/RecordButton';
import {TextBox} from './src/components/TextBox';

function App(): JSX.Element {
  const [results, setResults] = useState<string[]>([]);
  const [translation, setTranslation] = useState<{translatedText: string}>({
    translatedText: '',
  });
  const [isRecording, setRecording] = useState(false);
  const [isTranslating, setTranslating] = useState(false);

  useEffect(() => {
    Voice.onSpeechResults = onSpeechResults;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  function onSpeechResults(e: SpeechResultsEvent) {
    if (e.value) {
      setResults(e.value);
    }
  }

  async function startRecording() {
    setRecording(true);
    resetRecording();
    try {
      await Voice.start('en-US');
    } catch (e) {
      throw new Error(String(e));
    }
  }

  async function stopRecording() {
    setRecording(false);
    try {
      await Voice.stop();
      translateText();
    } catch (e) {
      throw new Error(String(e));
    }
  }

  function resetRecording() {
    setResults([]);
    setTranslation({
      translatedText: '',
    });
  }

  async function translateText() {
    if (!results?.[0]) {
      return null;
    }

    setTranslating(true);

    try {
      const res = await fetch('https://libretranslate.de/translate', {
        method: 'POST',
        body: JSON.stringify({
          q: results?.[0] ?? '',
          source: 'en',
          target: 'es',
          format: 'text',
          api_key: '',
        }),
        headers: {'Content-Type': 'application/json'},
      });

      const data = await res.json();
      setTranslation(data);
      setTranslating(false);
    } catch (e) {
      throw new Error(String(e));
    }
  }

  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={styles.container}>
          <TextBox label="Recorded Text" value={results[0]} />
          <TextBox
            label="Translated Text"
            value={translation?.translatedText}
            isLoading={isTranslating}
          />
        </View>
        <RecordButton
          disabled={isTranslating}
          label={isRecording ? 'Stop' : 'Record'}
          onClick={isRecording ? stopRecording : startRecording}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 19,
    paddingHorizontal: 8,
    marginBottom: 72,
  },
});

export default App;
