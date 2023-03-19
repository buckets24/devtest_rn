import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableHighlightProps,
} from 'react-native/';

interface RecordButtonProps extends TouchableHighlightProps {
  label: string;
  onClick: () => void;
}

function RecordButton({label, onClick, ...props}: RecordButtonProps) {
  return (
    <TouchableHighlight style={styles.record} onPress={onClick} {...props}>
      <Text style={styles.recordLabel}>{label}</Text>
    </TouchableHighlight>
  );
}

export {RecordButton};

const styles = StyleSheet.create({
  record: {
    width: 119,
    height: 51,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: '#dd3a16',
    borderRadius: 100,
  },
  recordLabel: {
    fontWeight: '600',
    fontSize: 16,
    color: '#FFFFFF',
  },
});
