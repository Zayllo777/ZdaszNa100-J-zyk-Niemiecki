import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  bigTitle: {
    fontSize: 26,
    fontFamily: 'SmoochSans_400Regular',
    color: '#333',
    textAlign: 'center',
    marginBottom: 0,
  },
  subtitle: {
    fontSize: 42,
    fontFamily: 'SmoochSans_400Regular',
    color: '#333',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 20,
    paddingHorizontal: 10,
    lineHeight: 50,
  },
  boldText: {
    fontWeight: 'bold',
  },
  flagBackground: {
    width: '110%',
    paddingVertical: 13,
    paddingHorizontal: 16,
    marginBottom: -350,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
  },
  screen: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  buttonsContainer: {
    width: '100%',
    maxWidth: 320,
    marginTop: -80,
  },
  button: {
    backgroundColor: '#00BFFF',
    paddingVertical: 22,
    paddingHorizontal: 40,
    borderRadius: 12,
    marginVertical: 12,
    width: '100%',
  },
  buttonText: {
    color: 'white',
    fontSize: 30,
    fontFamily: 'SmoochSans_400Regular',
    textAlign: 'center',
  },
  bottomButton: {
    backgroundColor: '#0077CC',
    paddingVertical: 16,
    paddingHorizontal: 30,
    borderRadius: 12,
    width: '100%',
    maxWidth: 320,
    marginBottom: 10,
  },
  bottomButtonText: {
    color: 'white',
    fontSize: 22,
    fontFamily: 'SmoochSans_400Regular',
    textAlign: 'center',
  },
});
