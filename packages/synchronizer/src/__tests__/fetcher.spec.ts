import sinon from 'sinon';
import {assert} from 'chai';
import {createDefaultMonokleFetcher} from '../createDefaultMonokleFetcher.js';

const TEST_QUERY = `
  query getCluster($id: ID) {
    getCluster(id: ID) {
      cluster {
        id
        name
        namespaceSync

        namespaces {
          id
          name
        }
      }
    }
  }
`;

type TEST_QUERY_RESULT_TYPE = {
  getCluster: {
    cluster: {
      id: string;
      name: string;
      namespaceSync: boolean;
      namespaces: {
        id: string;
        name: string;
      }[];
    };
  };
};

describe('Fetcher Tests', () => {
  const stubs: sinon.SinonStub[] = [];

  afterEach(async () => {
    if (stubs.length) {
      stubs.forEach(stub => stub.restore());
    }
  });

  describe('query', () => {
    it('runs a query with a valid token', async () => {
      const fetcher = createDefaultMonokleFetcher();

      fetcher.useAutomationToken('SAMPLE_TOKEN');

      const sendRequestStub = sinon.stub((fetcher as any)._apiHandler, 'sendRequest').callsFake(async (...args) => {
        return {
          ok: true,
          json: async () => {
            return {
              errors: [],
              data: {
                getCluster: {
                  cluster: {
                    id: 'cluster-1',
                    name: 'Cluster 1',
                    namespaceSync: true,
                    namespaces: [
                      {
                        id: 'ns1',
                        name: 'NS 1',
                      },
                      {
                        id: 'ns2',
                        name: 'NS 2',
                      },
                    ],
                  },
                },
              },
            };
          },
        };
      });
      stubs.push(sendRequestStub);

      const queryResult = await fetcher.query<TEST_QUERY_RESULT_TYPE>(TEST_QUERY);

      assert.isTrue(queryResult.success);
      assert.isUndefined(queryResult.error);
      assert.isDefined(queryResult.data);
      assert.equal(queryResult.data?.getCluster?.cluster?.id, 'cluster-1');
    });

    it('returns error when no token set', async () => {
      const fetcher = createDefaultMonokleFetcher();
      const queryResult = await fetcher.query<TEST_QUERY_RESULT_TYPE>(TEST_QUERY);

      assert.isFalse(queryResult.success);
      assert.isUndefined(queryResult.data);
      assert.match(queryResult.error ?? '', /No token set/);
    });

    it('return error when API query fails', async () => {
      const fetcher = createDefaultMonokleFetcher();

      fetcher.useAutomationToken('SAMPLE_TOKEN');

      const sendRequestStub = sinon
        .stub((fetcher as any)._apiHandler, 'sendRequest')
        .throws(
          new Error(
            "Connection error. Cannot fetch data from https://api.monokle.com/graphql. Error 'Not Found' (404)."
          )
        );
      stubs.push(sendRequestStub);

      const queryResult = await fetcher.query<TEST_QUERY_RESULT_TYPE>(TEST_QUERY);

      assert.isFalse(queryResult.success);
      assert.isUndefined(queryResult.data);
      assert.match(queryResult.error ?? '', /Connection error/);
    });
  });
});