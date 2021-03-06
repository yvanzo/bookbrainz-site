/*
 * Copyright (C) 2017  Ben Ockmore
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along
 * with this program; if not, write to the Free Software Foundation, Inc.,
 * 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
 */

import * as Immutable from 'immutable';
import {
	IDENTIFIER_TYPES, INVALID_ALIASES, INVALID_IDENTIFIERS,
	INVALID_NAME_SECTION, INVALID_SUBMISSION_SECTION, VALID_ALIASES,
	VALID_IDENTIFIERS, VALID_NAME_SECTION, VALID_SUBMISSION_SECTION
} from './data';
import {
	testValidateBooleanFunc, testValidateDateFunc,
	testValidatePositiveIntegerFunc
} from './helpers';
import {
	validateForm, validatePublisherSection, validatePublisherSectionArea,
	validatePublisherSectionBeginDate, validatePublisherSectionEndDate,
	validatePublisherSectionEnded, validatePublisherSectionType
} from '../../../../../src/client/entity-editor/validators/publisher';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';


chai.use(chaiAsPromised);
const {expect} = chai;


function describeValidatePublisherSectionArea() {
	const validArea = {id: 1};

	it('should pass a valid Object', () => {
		const result = validatePublisherSectionArea(validArea);
		expect(result).to.be.true;
	});

	it('should pass a valid Immutable.Map', () => {
		const result = validatePublisherSectionArea(
			Immutable.fromJS(validArea)
		);
		expect(result).to.be.true;
	});

	it('should reject an Object with an invalid ID', () => {
		const result = validatePublisherSectionArea({...validArea, id: null});
		expect(result).to.be.false;
	});

	const invalidAlias = {id: null};

	it('should reject an invalid Immutable.Map', () => {
		const result = validatePublisherSectionArea(
			Immutable.fromJS(invalidAlias)
		);
		expect(result).to.be.false;
	});

	it('should reject any other non-null data type', () => {
		const result = validatePublisherSectionArea(1);
		expect(result).to.be.false;
	});

	it('should pass a null value', () => {
		const result = validatePublisherSectionArea(null);
		expect(result).to.be.true;
	});
}

function describeValidatePublisherSectionBeginDate() {
	testValidateDateFunc(validatePublisherSectionBeginDate, false);
}

function describeValidatePublisherSectionEndDate() {
	testValidateDateFunc(validatePublisherSectionEndDate, false);
}

function describeValidatePublisherSectionEnded() {
	testValidateBooleanFunc(validatePublisherSectionEnded);
}

function describeValidatePublisherSectionType() {
	testValidatePositiveIntegerFunc(validatePublisherSectionType, false);
}

const VALID_PUBLISHER_SECTION = {
	area: null,
	beginDate: null,
	endDate: null,
	ended: true,
	type: 1
};
const INVALID_PUBLISHER_SECTION = {...VALID_PUBLISHER_SECTION, type: {}};

function describeValidatePublisherSection() {
	it('should pass a valid Object', () => {
		const result = validatePublisherSection(VALID_PUBLISHER_SECTION);
		expect(result).to.be.true;
	});

	it('should pass a valid Immutable.Map', () => {
		const result = validatePublisherSection(
			Immutable.fromJS(VALID_PUBLISHER_SECTION)
		);
		expect(result).to.be.true;
	});

	it('should reject an Object with an invalid area', () => {
		const result = validatePublisherSection({
			...VALID_PUBLISHER_SECTION,
			area: {id: null}
		});
		expect(result).to.be.false;
	});

	it('should reject an Object with an invalid begin date', () => {
		const result = validatePublisherSection({
			...VALID_PUBLISHER_SECTION,
			beginDate: '201'
		});
		expect(result).to.be.false;
	});

	it('should reject an Object with an invalid end date', () => {
		const result = validatePublisherSection({
			...VALID_PUBLISHER_SECTION,
			endDate: '201'
		});
		expect(result).to.be.false;
	});

	it('should reject an Object with an invalid ended flag', () => {
		const result = validatePublisherSection({
			...VALID_PUBLISHER_SECTION,
			ended: null
		});
		expect(result).to.be.false;
	});

	it('should reject an Object with an invalid type', () => {
		const result = validatePublisherSection({
			...VALID_PUBLISHER_SECTION,
			type: {}
		});
		expect(result).to.be.false;
	});

	it('should reject an invalid Immutable.Map', () => {
		const result = validatePublisherSection(
			Immutable.fromJS(INVALID_PUBLISHER_SECTION)
		);
		expect(result).to.be.false;
	});

	it('should reject any other non-null data type', () => {
		const result = validatePublisherSection(1);
		expect(result).to.be.false;
	});

	it('should reject a null value', () => {
		const result = validatePublisherSection(null);
		expect(result).to.be.false;
	});
}


function describeValidateForm() {
	const validForm = {
		aliasEditor: VALID_ALIASES,
		identifierEditor: VALID_IDENTIFIERS,
		nameSection: VALID_NAME_SECTION,
		publisherSection: VALID_PUBLISHER_SECTION,
		submissionSection: VALID_SUBMISSION_SECTION
	};

	it('should pass a valid Object', () => {
		const result = validateForm(validForm, IDENTIFIER_TYPES);
		expect(result).to.be.true;
	});

	it('should pass a valid Immutable.Map', () => {
		const result = validateForm(
			Immutable.fromJS(validForm),
			IDENTIFIER_TYPES
		);
		expect(result).to.be.true;
	});

	it('should reject an Object with an invalid alias editor', () => {
		const result = validateForm(
			{
				...validForm,
				aliasEditor: INVALID_ALIASES
			},
			IDENTIFIER_TYPES
		);
		expect(result).to.be.false;
	});

	it('should reject an Object with an invalid identifier editor', () => {
		const result = validateForm(
			{
				...validForm,
				identifierEditor: INVALID_IDENTIFIERS
			}, IDENTIFIER_TYPES
		);
		expect(result).to.be.false;
	});

	it('should reject an Object with an invalid name section', () => {
		const result = validateForm(
			{
				...validForm,
				nameSection: INVALID_NAME_SECTION
			},
			IDENTIFIER_TYPES
		);
		expect(result).to.be.false;
	});

	it('should reject an Object with an invalid publisher section', () => {
		const result = validateForm(
			{
				...validForm,
				publisherSection: INVALID_PUBLISHER_SECTION
			},
			IDENTIFIER_TYPES
		);
		expect(result).to.be.false;
	});

	it('should reject an Object with an invalid submission section', () => {
		const result = validateForm(
			{
				...validForm,
				submissionSection: INVALID_SUBMISSION_SECTION
			},
			IDENTIFIER_TYPES
		);
		expect(result).to.be.false;
	});

	const invalidForm = {
		...validForm,
		submissionSection: INVALID_SUBMISSION_SECTION
	};

	it('should reject an invalid Immutable.Map', () => {
		const result = validateForm(
			Immutable.fromJS(invalidForm),
			IDENTIFIER_TYPES
		);
		expect(result).to.be.false;
	});

	it('should reject any other non-null data type', () => {
		const result = validateForm(1, IDENTIFIER_TYPES);
		expect(result).to.be.false;
	});

	it('should reject a null value', () => {
		const result = validateForm(null, IDENTIFIER_TYPES);
		expect(result).to.be.false;
	});
}


function tests() {
	describe(
		'validatePublisherSectionArea',
		describeValidatePublisherSectionArea
	);
	describe(
		'validatePublisherSectionBeginDate',
		describeValidatePublisherSectionBeginDate
	);
	describe(
		'validatePublisherSectionEndDate',
		describeValidatePublisherSectionEndDate
	);
	describe(
		'validatePublisherSectionEnded',
		describeValidatePublisherSectionEnded
	);
	describe(
		'validatePublisherSectionType',
		describeValidatePublisherSectionType
	);
	describe(
		'validatePublisherSection',
		describeValidatePublisherSection
	);
	describe(
		'validateForm',
		describeValidateForm
	);
}

describe('validatePublisherSection* functions', tests);
