/*
Copyright 2018-2021 Justso GmbH, Frankfurt, Germany

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import configureStore from './configureStore'

describe('Root reducer', () => {
  it('should combine all reducers', () => {
    const store = configureStore()
    expect(Object.keys(store.getState())).toEqual(['misc', 'qrounds', 'questions', 'stats'])
  })
})
