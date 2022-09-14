import { expect } from 'chai';
import * as sinon from 'sinon';
import { ZodError } from 'zod';
import { ErrorTypes } from '../../../errors/catalog';
import FrameModel from '../../../models/Frame';
import FrameService from '../../../services/Frame';
import { frameMock, frameMockWithId } from '../../mocks/frameMock';

describe('Frame Service', () => {
  const frameModel = new FrameModel();
  const frameService = new FrameService(frameModel);frameMockWithId

  before(() => {
    sinon.stub(frameModel, 'create').resolves(frameMockWithId);
    sinon.stub(frameModel, 'readOne')
      // na chamada de index 0 `frameModel.readOne` vai responder um fakeFrame
      .onCall(0).resolves(frameMockWithId)
      // já na próxima chamada ele vai mudar seu retorno, isso pode ser feito várias vezes
      .onCall(1).resolves(null);
  });

  after(() => {
    sinon.restore();
  });

  describe('Create Frame', () => {
    it('Success', async () => {
      const frameCreated = await frameService.create(frameMock);

      expect(frameCreated).to.be.deep.equal(frameMockWithId);
    });

    it('Failure', async () => {
      let error;

      try {
        await frameService.create({});
      } catch (e) {
        error = e;
      }

      expect(error).to.be.instanceOf(ZodError);
    });
  });

  describe('ReadOne Frame', () => {
    it('Success', async () => {
      const frameRead = await frameService.readOne(frameMockWithId._id);

      expect(frameRead).to.be.deep.equal(frameMockWithId);
    });

    it('Failure', async () => {
      let error;

      try {
        await frameService.readOne('inexistent id');
      } catch (e: any) {
        error = e;
      }

      expect(error, 'error should be defined').not.to.be.undefined;
      expect(error.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
    });
  });
});