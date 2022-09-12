import { expect } from 'chai';
import sinon from 'sinon';
import LensModel from '../../../models/Lens';
import { Model } from 'mongoose';
import { lensMock, lensMockWithId } from '../../mocks/lensMock';

describe('Lens Model', () => {
  const lensModel = new LensModel();

	before(() => {
		sinon.stub(Model, 'create').resolves(lensMockWithId);
		sinon.stub(Model, 'findOne').resolves(lensMockWithId);
	});

	after(() => {
		sinon.restore();
	});

  describe('creating lens', () => {
		it('successfully created', async () => {
			const newLens = await lensModel.create(lensMock);
			expect(newLens).to.be.deep.equal(lensMockWithId);
		});
	});

	// describe('searching a frame', () => {
	// 	it('successfully found', async () => {
	// 		const framesFound = await frameModel.readOne('62cf1fc6498565d94eba52cd');
	// 		expect(framesFound).to.be.deep.equal(lensMockWithId);
	// 	});

	// 	it('_id not found', async () => {
	// 		try {
	// 			await frameModel.readOne('123ERRADO');
	// 		} catch (error: any) {
	// 			expect(error.message).to.be.eq('InvalidMongoId');
	// 		}
	// 	});
	// });

});