import {
  deleteCurrent,
  deleteAll,
  deletedCurrentAndFollowing,
  editAll,
  editCurrent,
  editCurrentAndFollowing,
} from './helpers';

describe('EditingState', () => {
  describe('deleted helpers' , () => {
    describe('#deleteAll', () => {
      it('should work', () => {
        const appointmentData = { id: 0 };

        const changes = deleteAll(appointmentData);
        expect(changes).toEqual({ deleted: 0 });
      });
    });

    describe('#deleteCurrent', () => {
      it('should work without the exDate field', () => {
        const appointmentData = {
          id: 0,
          startDate: new Date(Date.UTC(2019, 6, 17, 14, 20)),
          endDate: new Date(Date.UTC(2019, 6, 17, 16)),
          rRule: 'FREQ=DAILY;COUNT=3',
          parentData: {
            rRule: 'FREQ=DAILY;COUNT=3',
            startDate: new Date(Date.UTC(2019, 6, 15, 14, 20)),
            endDate: new Date(Date.UTC(2019, 6, 15, 16)),
          },
        };

        const changes = deleteCurrent(appointmentData);
        expect(changes).toEqual({ changed: { 0: { exDate: '20190717T142000Z' } } });
      });
      it('should work with the exDate field', () => {
        const appointmentData = {
          id: 0,
          startDate: new Date(Date.UTC(2019, 6, 17, 14, 20)),
          endDate: new Date(Date.UTC(2019, 6, 17, 16)),
          exDate: '20190716T142000Z',
          rRule: 'FREQ=DAILY;COUNT=5',
          parentData: {
            rRule: 'FREQ=DAILY;COUNT=5',
            startDate: new Date(Date.UTC(2019, 6, 14, 14, 20)),
            endDate: new Date(Date.UTC(2019, 6, 14, 16)),
          },
        };

        const changes = deleteCurrent(appointmentData);
        expect(changes).toEqual({
          changed: { 0: { exDate: '20190716T142000Z,20190717T142000Z' } },
        });
      });
      it('should remove all sequence if current item is last', () => {
        const appointmentData = {
          id: 0,
          startDate: new Date(Date.UTC(2019, 6, 17, 14, 20)),
          endDate: new Date(Date.UTC(2019, 6, 17, 16)),
          exDate: '20190716T142000Z,20190715T142000Z',
          rRule: 'FREQ=DAILY;COUNT=3',
          parentData: {
            rRule: 'FREQ=DAILY;COUNT=3',
            startDate: new Date(Date.UTC(2019, 6, 15, 14, 20)),
            endDate: new Date(Date.UTC(2019, 6, 15, 16)),
          },
        };

        const changes = deleteCurrent(appointmentData);
        expect(changes).toEqual({ deleted: 0 });
      });
    });

    describe('#deletedCurrentAndFollowing', () => {
      it('should work without the exDate field', () => {
        const appointmentData = {
          id: 0,
          startDate: new Date(Date.UTC(2019, 6, 17, 14, 20)),
          endDate: new Date(Date.UTC(2019, 6, 17, 16)),
          rRule: 'FREQ=DAILY;COUNT=5',
          parentData: {
            startDate: new Date(Date.UTC(2019, 6, 15, 14, 20)),
            endDate: new Date(Date.UTC(2019, 6, 15, 16)),
          },
        };

        const changes = deletedCurrentAndFollowing(appointmentData);
        expect(changes).toEqual({ changed: { 0: {
          rRule: 'FREQ=DAILY;UNTIL=20190717T142000Z',
        } } });
      });

      it('should remove exDate field if it placed after deleted date', () => {
        const appointmentData = {
          id: 0,
          startDate: new Date(Date.UTC(2019, 6, 17, 14, 20)),
          endDate: new Date(Date.UTC(2019, 6, 17, 16)),
          rRule: 'FREQ=DAILY;COUNT=5',
          exDate: '20190716T142000Z,20190718T142000Z',
          parentData: {
            startDate: new Date(Date.UTC(2019, 6, 15, 14, 20)),
            endDate: new Date(Date.UTC(2019, 6, 15, 16)),
          },
        };

        const changes = deletedCurrentAndFollowing(appointmentData);
        expect(changes).toEqual({ changed: { 0: {
          rRule: 'FREQ=DAILY;UNTIL=20190717T142000Z',
          exDate: '20190716T142000Z',
        } } });
      });

      it('should not remove exDate field if it placed before deleted date', () => {
        const appointmentData = {
          id: 0,
          startDate: new Date(Date.UTC(2019, 6, 17, 14, 20)),
          endDate: new Date(Date.UTC(2019, 6, 17, 16)),
          rRule: 'FREQ=DAILY;COUNT=5',
          exDate: '20190716T142000Z',
          parentData: {
            startDate: new Date(Date.UTC(2019, 6, 15, 14, 20)),
            endDate: new Date(Date.UTC(2019, 6, 15, 16)),
          },
        };

        const changes = deletedCurrentAndFollowing(appointmentData);
        expect(changes).toEqual({ changed: { 0: {
          rRule: 'FREQ=DAILY;UNTIL=20190717T142000Z',
        } } });
      });

      it('should remove all sequence if current item is last', () => {
        const appointmentData = {
          id: 0,
          startDate: new Date(Date.UTC(2019, 6, 17, 14, 20)),
          endDate: new Date(Date.UTC(2019, 6, 17, 16)),
          exDate: '20190716T142000Z,20190715T142000Z',
          rRule: 'FREQ=DAILY;COUNT=3',
          parentData: {
            rRule: 'FREQ=DAILY;COUNT=3',
            startDate: new Date(Date.UTC(2019, 6, 15, 14, 20)),
            endDate: new Date(Date.UTC(2019, 6, 15, 16)),
          },
        };

        const changes = deleteCurrent(appointmentData);
        expect(changes).toEqual({ deleted: 0 });
      });
    });
  });

  describe('editing helpers', () => {
    const appointmentDataBase = {
      id: 4,
      startDate: new Date(Date.UTC(2019, 6, 17, 14, 20)),
      endDate: new Date(Date.UTC(2019, 6, 17, 16)),
      rRule: 'FREQ=DAILY;COUNT=5',
      exDate: '20190716T142000Z',
      parentData: {
        id: 4,
        startDate: new Date(Date.UTC(2019, 6, 15, 14, 20)),
        endDate: new Date(Date.UTC(2019, 6, 15, 16)),
      },
    };
    describe('#editAll', () => {
      it('should edit simple recurrence', () => {
        const changes = {
          startDate: new Date(Date.UTC(2019, 6, 17, 14, 20)),
          endDate: new Date(Date.UTC(2019, 6, 17, 16)),
          rRule: 'FREQ=DAILY;COUNT=5',
        };

        expect(editAll(changes, appointmentDataBase)).toEqual({
          changed: {
            4: {
              startDate: new Date(Date.UTC(2019, 6, 17, 14, 20)),
              endDate: new Date(Date.UTC(2019, 6, 17, 16)),
              rRule: 'FREQ=DAILY;COUNT=5',
            },
          },
        });
      });
      it('should edit if the item is moved after until', () => {
        const appointmentData = {
          ...appointmentDataBase,
          startDate: new Date(Date.UTC(2019, 6, 17, 14, 20)),
          endDate: new Date(Date.UTC(2019, 6, 17, 16)),
          rRule: 'FREQ=DAILY;UNTIL=20190717T142000Z',
          exDate: '20190716T142000Z',
        };
        const changes = {
          startDate: new Date(Date.UTC(2019, 6, 18, 14, 20)),
          endDate: new Date(Date.UTC(2019, 6, 18, 16)),
        };

        expect(editAll(changes, appointmentData)).toEqual({
          changed: {
            4: {
              startDate: new Date(Date.UTC(2019, 6, 18, 14, 20)),
              endDate: new Date(Date.UTC(2019, 6, 18, 16)),
              rRule: 'FREQ=DAILY;COUNT=1',
              exDate: '',
            },
          },
        });
      });
    });

    describe('#editCurrent', () => {
      it('should work', () => {
        const changes = {
          startDate: new Date(Date.UTC(2019, 6, 17, 14, 20)),
          endDate: new Date(Date.UTC(2019, 6, 17, 16)),
        };

        expect(editCurrent(changes, appointmentDataBase)).toEqual({
          changed: {
            4: {
              exDate: '20190716T142000Z,20190717T142000Z',
            },
          },
          added: {
            startDate: new Date(Date.UTC(2019, 6, 17, 14, 20)),
            endDate: new Date(Date.UTC(2019, 6, 17, 16)),
          },
        });
      });
      it('should process not required fields', () => {
        const changes = {
          title: 'Next title',
          data: 123,
          startDate: new Date(Date.UTC(2019, 6, 17, 14, 20)),
          endDate: new Date(Date.UTC(2019, 6, 17, 16)),
        };

        expect(editCurrent(changes, { ...appointmentDataBase, exDate: '' })).toEqual({
          changed: {
            4: {
              exDate: '20190717T142000Z',
            },
          },
          added: {
            title: 'Next title',
            data: 123,
            startDate: new Date(Date.UTC(2019, 6, 17, 14, 20)),
            endDate: new Date(Date.UTC(2019, 6, 17, 16)),
          },
        });
      });
      it('should edit simple fields', () => {
        const changes = {
          title: 'Next title',
        };

        expect(editCurrent(changes, appointmentDataBase)).toEqual({
          changed: {
            4: {
              exDate: '20190716T142000Z,20190717T142000Z',
            },
          },
          added: {
            title: 'Next title',
            startDate: new Date(Date.UTC(2019, 6, 17, 14, 20)),
            endDate: new Date(Date.UTC(2019, 6, 17, 16)),
          },
        });
      });
    });

    describe('#editCurrentAndFollowing', () => {
      it('should work with excluded days', () => {
        const appointmentData = {
          ...appointmentDataBase,
          startDate: new Date(Date.UTC(2019, 6, 18, 14, 20)),
          endDate: new Date(Date.UTC(2019, 6, 18, 16)),
        };
        const changes = {
          startDate: new Date(Date.UTC(2019, 6, 17, 14, 20)),
          endDate: new Date(Date.UTC(2019, 6, 17, 16)),
        };

        expect(editCurrentAndFollowing(changes, appointmentData)).toEqual({
          changed: {
            4: {
              rRule: 'FREQ=DAILY;UNTIL=20190717T142000Z',
            },
          },
          added: {
            startDate: new Date(Date.UTC(2019, 6, 17, 14, 20)),
            endDate: new Date(Date.UTC(2019, 6, 17, 16)),
            rRule: 'FREQ=DAILY;COUNT=2',
          },
        });
      });
      it('should edit simple fields', () => {
        const changes = {
          title: 'Next title',
        };

        expect(editCurrentAndFollowing(changes, appointmentDataBase)).toEqual({
          changed: {
            4: {
              rRule: 'FREQ=DAILY;UNTIL=20190715T142000Z',
            },
          },
          added: {
            title: 'Next title',
            rRule: 'FREQ=DAILY;COUNT=3',
            startDate: new Date(Date.UTC(2019, 6, 17, 14, 20)),
            endDate: new Date(Date.UTC(2019, 6, 17, 16)),
          },
        });
      });
      it('should apply "all" strategy with start sequence item', () => {
        const appointmentData = {
          id: 4,
          startDate: new Date(Date.UTC(2019, 6, 16, 14, 20)),
          endDate: new Date(Date.UTC(2019, 6, 16, 16)),
          rRule: 'FREQ=DAILY;COUNT=5',
          exDate: '20190715T142000Z',
          parentData: {
            id: 4,
            startDate: new Date(Date.UTC(2019, 6, 15, 14, 20)),
            endDate: new Date(Date.UTC(2019, 6, 15, 16)),
          },
        };
        const changes = {
          startDate: new Date(Date.UTC(2019, 6, 15, 11, 20)),
          endDate: new Date(Date.UTC(2019, 6, 15, 14)),
        };

        expect(editCurrentAndFollowing(changes, appointmentData)).toEqual({
          changed: {
            4: {
              startDate: new Date(Date.UTC(2019, 6, 15, 11, 20)),
              endDate: new Date(Date.UTC(2019, 6, 15, 14)),
            },
          },
        });
      });
      it('should remove "until" and "exDate" fields if item is moved after "until"', () => {
        const appointmentData = {
          id: 4,
          startDate: new Date(Date.UTC(2019, 6, 16, 14, 20)),
          endDate: new Date(Date.UTC(2019, 6, 16, 16)),
          rRule: 'FREQ=DAILY;COUNT=3;UNTIL=20190716T142000Z',
          exDate: '20190717T142000Z',
          parentData: {
            id: 4,
            startDate: new Date(Date.UTC(2019, 6, 15, 14, 20)),
            endDate: new Date(Date.UTC(2019, 6, 15, 16)),
          },
        };
        const changes = {
          startDate: new Date(Date.UTC(2019, 6, 17, 14, 20)),
          endDate: new Date(Date.UTC(2019, 6, 17, 16)),
        };

        expect(editCurrentAndFollowing(changes, appointmentData)).toEqual({
          added: {
            startDate: new Date(Date.UTC(2019, 6, 17, 14, 20)),
            endDate: new Date(Date.UTC(2019, 6, 17, 16)),
            rRule: 'FREQ=DAILY;COUNT=1',
            exDate: '',
          },
          changed: {
            4: {
              rRule: 'FREQ=DAILY;UNTIL=20190715T142000Z',
            },
          },
        });
      });
      it('should remove "until" and "exDate" fields if last item is moved after "until"', () => {
        const appointmentData = {
          id: 4,
          startDate: new Date(Date.UTC(2019, 6, 16, 14, 20)),
          endDate: new Date(Date.UTC(2019, 6, 16, 16)),
          rRule: 'FREQ=DAILY;UNTIL=20190716T142000Z',
          parentData: {
            id: 4,
            startDate: new Date(Date.UTC(2019, 6, 16, 14, 20)),
            endDate: new Date(Date.UTC(2019, 6, 16, 16)),
          },
        };
        const changes = {
          startDate: new Date(Date.UTC(2019, 6, 17, 14, 20)),
          endDate: new Date(Date.UTC(2019, 6, 17, 16)),
        };

        console.log(editCurrentAndFollowing(changes, appointmentData));
        expect(editCurrentAndFollowing(changes, appointmentData)).toEqual({
          changed: {
            4: {
              startDate: new Date(Date.UTC(2019, 6, 17, 14, 20)),
              endDate: new Date(Date.UTC(2019, 6, 17, 16)),
              rRule: 'FREQ=DAILY;COUNT=1',
              exDate: '',
            },
          },
        });
      });
    });
  });
});
