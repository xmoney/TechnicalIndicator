/**
 * MIT License
 * Copyright (c) 2020 lihu

 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:

 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.

 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

/**
 * 变动率指标
 * 公式：ROC = (CLOSE - REF(CLOSE, N)) / REF(CLOSE, N)
 *
 * @type {{calcTechnicalIndicator: (function(*, *): {}), calcParams: [number], shouldCheckParamCount: boolean, name: string, plots: [{type: string, key: string}]}}
 */
const rateOfChange = {
  name: 'ROC',
  calcParams: [12, 6],
  shouldCheckParamCount: true,
  plots: [
    { key: 'roc', type: 'line' },
    { key: 'rocMa', type: 'line' }
  ],
  calcTechnicalIndicator: (kLineDataList, calcParams) => {
    const result = []
    let rocSum = 0
    kLineDataList.forEach((kLineData, i) => {
      const roc = {}
      if (i >= calcParams[0] - 1) {
        const close = kLineData.close
        const agoClose = kLineDataList[i - (calcParams[0] - 1)].close
        if (agoClose !== 0) {
          roc.roc = (close - agoClose) / agoClose
        } else {
          roc.roc = 0
        }
        rocSum += roc.roc
        if (i >= calcParams[0] - 1 + calcParams[1] - 1) {
          roc.rocMa = rocSum / calcParams[1]
          rocSum -= result[i - (calcParams[1] - 1)].roc
        }
      }
      result.push(roc)
    })
    return result
  }
}

export default rateOfChange
