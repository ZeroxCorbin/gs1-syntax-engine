/**
 *  JavaScript wrapper for the GS1 Syntax Engine compiled as a WASM by
 *  Emscripten.
 *
 *  Copyright (c) 2022 GS1 AISBL.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 *
 */

'use strict';


/*
 *  Note: gs1encoder-wasm.js and gs1encoder-wasm.wasm can be generated by
 *  running "make wasm" in the src/c-lib directory, provided that the EMSDK is
 *  installed and activated.
 *
 *  Most browsers require that the .wasm is served with the MIME type set as
 *  "application/wasm".
 *
 */
import createGS1encoderModule from './gs1encoder-wasm.mjs';


/**
 *  <pre>
 *
 *  This class implements a wrapper around the GS1 Syntax Engine WASM build
 *  that presents its functionality in the form of a typical JavaScript object
 *  interface.
 *
 *  Since this class is a very lightweight shim around the WASM build of the
 *  library, the JavaScript interface is described here by reference to the
 *  public API functions of the native library, specifically by reference to
 *  the function that each getter/setter invokes.
 *
 *  The API reference for the native C library is available here:
 *
 *      https://gs1.github.io/gs1-syntax-engine/
 *
 *  </pre>
 *
 */
export class GS1encoder {

    constructor() {
        this.ctx = null;
    }

    /**
     *  Initialise an object which wraps an "instance" of the WASM library.
     *
     *  @throws {GS1encoderGeneralException}
     *
     *  @example See the native library documentation for details:
     *
     *    - gs1_encoder_init()
     *
     */
    async init() {

        /*
         *  Load the WASM
         *
         */
        this.module = await createGS1encoderModule();

        /*
         *  Public API functions implemented by the WASM build of the GS1
         *  Syntax Engine library
         *
         */
        this.api = {
            gs1_encoder_getVersion:
                this.module.cwrap('gs1_encoder_getVersion', 'string', []),
            gs1_encoder_init:
                this.module.cwrap('gs1_encoder_init', 'number', []),
            gs1_encoder_free:
                this.module.cwrap('gs1_encoder_free', '', ['number']),
            gs1_encoder_getErrMsg:
                this.module.cwrap('gs1_encoder_getErrMsg', 'string', ['number']),
            gs1_encoder_getErrMarkup:
                this.module.cwrap('gs1_encoder_getErrMarkup', 'string', ['number']),
            gs1_encoder_getSym:
                this.module.cwrap('gs1_encoder_getSym', 'number', ['number']),
            gs1_encoder_setSym:
                this.module.cwrap('gs1_encoder_setSym', 'number', ['number', 'number']),
            gs1_encoder_getAddCheckDigit:
                this.module.cwrap('gs1_encoder_getAddCheckDigit', 'number', ['number']),
            gs1_encoder_setAddCheckDigit:
                this.module.cwrap('gs1_encoder_setAddCheckDigit', 'number', ['number', 'number']),
            gs1_encoder_getPermitUnknownAIs:
                this.module.cwrap('gs1_encoder_getPermitUnknownAIs', 'number', ['number']),
            gs1_encoder_setPermitUnknownAIs:
                this.module.cwrap('gs1_encoder_setPermitUnknownAIs', 'number', ['number', 'number']),
            gs1_encoder_getIncludeDataTitlesInHRI:
                this.module.cwrap('gs1_encoder_getIncludeDataTitlesInHRI', 'number', ['number']),
            gs1_encoder_setIncludeDataTitlesInHRI:
                this.module.cwrap('gs1_encoder_setIncludeDataTitlesInHRI', 'number', ['number', 'number']),
            gs1_encoder_getValidateAIassociations:
                this.module.cwrap('gs1_encoder_getValidateAIassociations', 'number', ['number']),
            gs1_encoder_setValidateAIassociations:
                this.module.cwrap('gs1_encoder_setValidateAIassociations', 'number', ['number', 'number']),
            gs1_encoder_setAIdataStr:
                this.module.cwrap('gs1_encoder_setAIdataStr', 'number', ['number', 'string']),
            gs1_encoder_getAIdataStr:
                this.module.cwrap('gs1_encoder_getAIdataStr', 'number', ['number']),
            gs1_encoder_setDataStr:
                this.module.cwrap('gs1_encoder_setDataStr', 'number', ['number', 'string']),
            gs1_encoder_getDataStr:
                this.module.cwrap('gs1_encoder_getDataStr', 'string', ['number']),
            gs1_encoder_getDLuri:
                this.module.cwrap('gs1_encoder_getDLuri', 'string', ['number', 'string']),
            gs1_encoder_setScanData:
                this.module.cwrap('gs1_encoder_setScanData', 'number', ['number', 'string']),
            gs1_encoder_getScanData:
                this.module.cwrap('gs1_encoder_getScanData', 'string', ['number']),
            gs1_encoder_getHRI:
                this.module.cwrap('gs1_encoder_getHRI', 'number', ['number', 'number']),
            gs1_encoder_getDLignoredQueryParams:
                this.module.cwrap('gs1_encoder_getDLignoredQueryParams', null, ['number', 'number']),
        };

        this.ctx = this.api.gs1_encoder_init(null);
        if (this.ctx === null)
            throw new GS1encoderGeneralException("Failed to initalise GS1 Syntax Engine");

    }


    /**
     * Destructor that will release this instance.
     *
     * @example See the native library documentation for details:
     *
     *   - gs1_encoder_free()
     *
     */
    free() {
        this.api.gs1_encoder_free(this.ctx);
        this.ctx = null;
    }


    /**
     * Returns the version of the WASM library.
     *
     * @example See the native library documentation for details:
     *
     *   - gs1_encoder_getVersion()
     *
     */
    get version() {
        return this.api.gs1_encoder_getVersion();
    }


    /**
     * Read the error markup generated when parsing AI data fails due to a
     * linting failure.
     *
     * @example See the native library documentation for details:
     *
     *   - gs1_encoder_getErrMarkup()
     *
     */
    get errMarkup() {
        return this.api.gs1_encoder_getErrMarkup(this.ctx);
    }


    /**
     * Get/set the symbology type.
     *
     * @throws {GS1encoderParameterException}
     *
     * @example See the native library documentation for details:
     *
     *   - gs1_encoder_getSym()
     *   - gs1_encoder_setSym()
     *
     */
    get sym() {
        return this.api.gs1_encoder_getSym(this.ctx);
    }
    set sym(value) {
        if (!this.api.gs1_encoder_setSym(this.ctx, value))
            throw new GS1encoderParameterException(this.api.gs1_encoder_getErrMsg(this.ctx));
    }


    /**
     * Get/set the "add check digit" mode for EAN/UPC and GS1 DataBar symbols.
     *
     * @throws {GS1encoderParameterException}
     *
     * @example See the native library documentation for details:
     *
     *   - gs1_encoder_getAddCheckDigit()
     *   - gs1_encoder_setAddCheckDigit()
     *
     */
    get addCheckDigit() {
        return this.api.gs1_encoder_getAddCheckDigit(this.ctx);
    }
    set addCheckDigit(value) {
        if (!this.api.gs1_encoder_setAddCheckDigit(this.ctx, value ? 1 : 0))
            throw new GS1encoderParameterException(this.api.gs1_encoder_getErrMsg(this.ctx));
    }


    /**
     * Get/set the "permit unknown AIs" mode.
     *
     * @throws {GS1encoderParameterException}
     *
     * @example See the native library documentation for details:
     *
     *   - gs1_encoder_getPermitUnknownAIs()
     *   - gs1_encoder_setPermitUnknownAIs()
     *
     */
    get permitUnknownAIs() {
        return this.api.gs1_encoder_getPermitUnknownAIs(this.ctx);
    }
    set permitUnknownAIs(value) {
        if (!this.api.gs1_encoder_setPermitUnknownAIs(this.ctx, value ? 1 : 0))
            throw new GS1encoderParameterException(this.api.gs1_encoder_getErrMsg(this.ctx));
    }


    /**
     * Get/set the "include data titles in HRI" flag.
     *
     * @throws {GS1encoderParameterException}
     *
     * @example See the native library documentation for details:
     *
     *   - gs1_encoder_getIncludeDataTitlesInHRI()
     *   - gs1_encoder_setIncludeDataTitlesInHRI()
     *
     */
    get includeDataTitlesInHRI() {
        return this.api.gs1_encoder_getIncludeDataTitlesInHRI(this.ctx);
    }
    set includeDataTitlesInHRI(value) {
        if (!this.api.gs1_encoder_setIncludeDataTitlesInHRI(this.ctx, value ? 1 : 0))
            throw new GS1encoderParameterException(this.api.gs1_encoder_getErrMsg(this.ctx));
    }


    /**
     * Get/set the "validate AI associations" flag.
     *
     * @throws {GS1encoderParameterException}
     *
     * @example See the native library documentation for details:
     *
     *   - gs1_encoder_getValidateAIassociations()
     *   - gs1_encoder_setValidateAIassociations()
     *
     */
    get validateAIassociations() {
        return this.api.gs1_encoder_getValidateAIassociations(this.ctx);
    }
    set validateAIassociations(value) {
        if (!this.api.gs1_encoder_setValidateAIassociations(this.ctx, value ? 1 : 0))
            throw new GS1encoderParameterException(this.api.gs1_encoder_getErrMsg(this.ctx));
    }

    /**
     * Get/set the barcode data input buffer using GS1 AI syntax.
     *
     * @throws {GS1encoderParameterException}
     *
     * @example See the native library documentation for details:
     *
     *   - gs1_encoder_getAIdataStr()
     *   - gs1_encoder_setAIdataStr()
     *
     */
    get aiDataStr() {
        var c_str = this.api.gs1_encoder_getAIdataStr(this.ctx);
        if (!c_str)
            return null;
        return this.module.UTF8ToString(c_str);
    }
    set aiDataStr(value) {
        if (!this.api.gs1_encoder_setAIdataStr(this.ctx, value))
            throw new GS1encoderParameterException(this.api.gs1_encoder_getErrMsg(this.ctx));
    }

    /**
     * Get/set the raw barcode data input buffer.
     *
     * @throws {GS1encoderParameterException}
     *
     * @example See the native library documentation for details:
     *
     *   - gs1_encoder_getDataStr()
     *   - gs1_encoder_setDataStr()
     *
     */
    get dataStr() {
        return this.api.gs1_encoder_getDataStr(this.ctx);
    }
    set dataStr(value) {
        if (!this.api.gs1_encoder_setDataStr(this.ctx, value))
            throw new GS1encoderParameterException(this.api.gs1_encoder_getErrMsg(this.ctx));
    }


    /**
     * Get a GS1 Digital Link URI that represents the AI-based input data.
     *
     * @throws {GS1encoderDigitalLinkException}
     *
     * @example See the native library documentation for details:
     *
     *   - gs1_encoder_getDLuri()
     *
     */
    getDLuri(stem) {
        var uri = this.api.gs1_encoder_getDLuri(this.ctx, stem);
        if (!uri)
            throw new GS1encoderDigitalLinkException(this.api.gs1_encoder_getErrMsg(this.ctx));
        return uri;
    }


    /**
     * Get/set the barcode data input buffer using barcode scan data format.
     *
     * @throws {GS1encoderParameterException}
     *
     * @example See the native library documentation for details:
     *
     *   - gs1_encoder_getScanData()
     *   - gs1_encoder_setScanData()
     *
     */
    get scanData() {
        return this.api.gs1_encoder_getScanData(this.ctx);
    }
    set scanData(value) {
        if (!this.api.gs1_encoder_setScanData(this.ctx, value))
            throw new GS1encoderParameterException(this.api.gs1_encoder_getErrMsg(this.ctx));
    }


    /**
     * Get the Human-Readable Interpretation ("HRI") text for the current data input buffer as an array of strings.
     *
     * @example See the native library documentation for details:
     *
     *   - gs1_encoder_getHRI()
     *
     */
    get hri() {
        var ptr = this.module._malloc(Uint32Array.BYTES_PER_ELEMENT);
        var size = this.api.gs1_encoder_getHRI(this.ctx, ptr);
        var hri = Array(size);
        for (var i = 0, p = this.module.getValue(ptr, 'i32');
             i < size;
             i++, p += Uint32Array.BYTES_PER_ELEMENT) {
            hri[i] = this.module.UTF8ToString(this.module.getValue(p, 'i32'));
        }
        return hri;
    }


    /**
     * Get the non-numeric (ignored) query parameters for a GS1 Digital Link URI in the current data input buffer as an array of strings.
     *
     * @example See the native library documentation for details:
     *
     *   - gs1_encoder_getDLignoredQueryParams()
     *
     */
    get dlIgnoredQueryParams() {
        var ptr = this.module._malloc(Uint32Array.BYTES_PER_ELEMENT);
        var size = this.api.gs1_encoder_getDLignoredQueryParams(this.ctx, ptr);
        var qp = Array(size);
        for (var i = 0, p = this.module.getValue(ptr, 'i32');
             i < size;
             i++, p += Uint32Array.BYTES_PER_ELEMENT) {
            qp[i] = this.module.UTF8ToString(this.module.getValue(p, 'i32'));
        }
        return qp;
    }

}


/** @ignore */
const symbology = {
    NONE: -1,               ///< None defined
    DataBarOmni: 0,         ///< GS1 DataBar Omnidirectional
    DataBarTruncated: 1,    ///< GS1 DataBar Truncated
    DataBarStacked: 2,      ///< GS1 DataBar Stacked
    DataBarStackedOmni: 3,  ///< GS1 DataBar Stacked Omnidirectional
    DataBarLimited: 4,      ///< GS1 DataBar Limited
    DataBarExpanded: 5,     ///< GS1 DataBar Expanded (Stacked)
    UPCA: 6,                ///< UPC-A
    UPCE: 7,                ///< UPC-E
    EAN13: 8,               ///< EAN-13
    EAN8: 9,                ///< EAN-8
    GS1_128_CCA: 10,        ///< GS1-128 with CC-A or CC-B
    GS1_128_CCC: 11,        ///< GS1-128 with CC-C
    QR: 12,                 ///< (GS1) QR Code
    DM: 13,                 ///< (GS1) Data Matrix
    NUMSYMS: 14,
};


GS1encoder.symbology = symbology;


function GS1encoderGeneralException(message) {
    const error = new Error(message);
    return error;
}
GS1encoderGeneralException.prototype = Object.create(Error.prototype);


function GS1encoderParameterException(message) {
    const error = new Error(message);
    return error;
}
GS1encoderParameterException.prototype = Object.create(Error.prototype);


function GS1encoderDigitalLinkException(message) {
    const error = new Error(message);
    return error;
}
GS1encoderDigitalLinkException.prototype = Object.create(Error.prototype);


function GS1encoderScanDataException(message) {
    const error = new Error(message);
    return error;
}
GS1encoderScanDataException.prototype = Object.create(Error.prototype);
