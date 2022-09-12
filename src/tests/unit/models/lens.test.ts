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
		sinon.stub(Model, 'find').resolves([lensMockWithId]);
    sinon.stub(Model, 'findByIdAndRemove').resolves(lensMockWithId);
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

	describe('searching for one lens object', () => {
		it('successfully found', async () => {
			const lensFound = await lensModel.readOne('62cf1fc6498565d94eba52cd');
			expect(lensFound).to.be.deep.equal(lensMockWithId);
		});

		it('_id not found', async () => {
			try {
				await lensModel.readOne('123ERRADO');
			} catch (error: any) {
				expect(error.message).to.be.eq('InvalidMongoId');
			}
		});
	});

  describe('searching for all lens', () => {
		it('successfully found', async () => {
			const lensFound = await lensModel.read();
			expect(lensFound).to.be.deep.equal([lensMockWithId]);
		});
	});

  describe('deleting a lens object', () => {
		it('successfully deleted',async () => {
			const deletedLens = await lensModel.destroy(lensMockWithId._id);
			expect(deletedLens).to.be.deep.equal(lensMockWithId);
		});

		it('_id not found', async () => {
			try {
				await lensModel.destroy('123ERRADO');
			} catch (error: any) {
				expect(error.message).to.be.eq('InvalidMongoId');
			}
		});
	});

});