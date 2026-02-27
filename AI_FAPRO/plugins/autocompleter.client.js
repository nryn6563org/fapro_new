import autocomplete from 'autocompleter'
import 'autocompleter/autocomplete.css'

/**
 * 기능: Autocompleter 플러그인 (Rule 14)
 * 입력창에 자동완성 기능을 쉽게 부여하기 위한 헬퍼
 */

export default (context, inject) => {
  inject('autocomplete', (input, options) => {
    return autocomplete({
      input,
      ...options
    })
  })
}
