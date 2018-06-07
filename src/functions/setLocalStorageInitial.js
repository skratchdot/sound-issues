export const setLocalStorageInitial = () => {

  if (!localStorage.getItem('appMode')) {
    localStorage.setItem('appMode', 'scale')
  }
  if (!localStorage.getItem('playbackChordOnTap')) {
    localStorage.setItem('playbackChordOnTap', true)
  }
  if (!localStorage.getItem('displayFourNoteChords')) {
    localStorage.setItem('displayFourNoteChords', false)
  }
  if (!localStorage.getItem('displayMinorInSmall')) {
    localStorage.setItem('displayMinorInSmall', false)
  }
  if (!localStorage.getItem('germanNoteNames')) {
    localStorage.setItem('germanNoteNames', false)
  }
  if (!localStorage.getItem('appTheme')) {
    localStorage.setItem('appTheme', 'dark')
  }
  if (!localStorage.getItem('favoriteClef')) {
    localStorage.setItem('favoriteClef', 'clefG')
  }
  if (!localStorage.getItem('hapticFeedback')) {
    localStorage.setItem('hapticFeedback', true)
  }
  if (!localStorage.getItem('musicalKey')) {
    localStorage.setItem('musicalKey', 'C')
  }
  if (!localStorage.getItem('visualKey')) {
    localStorage.setItem('visualKey', 'C')
  }
  if (!localStorage.getItem('musicalMode')) {
    localStorage.setItem('musicalMode', 'ionian')
  }
  if (!localStorage.getItem('wheelRotationKey')) {
    localStorage.setItem('wheelRotationKey', 0)
  }
  if (!localStorage.getItem('wheelRotationKeyVisual')) {
    localStorage.setItem('wheelRotationKeyVisual', 0)
  }
  if (!localStorage.getItem('wheelRotationMode')) {
    localStorage.setItem('wheelRotationMode', 0)
  }
}
