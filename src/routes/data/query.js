import { createServer } from '@graphql-yoga/common';
import { PrismaClient } from '@prisma/client';
import { loadFiles } from '@graphql-tools/load-files';

import { BigIntResolver } from 'graphql-scalars';

const serverApp = createServer({
	schema: {
		typeDefs: await loadFiles('src/lib/schema/**/*.gql'),
		resolvers: {
			BigInt: BigIntResolver,

			Query: {
				allProteins: (parent, args, context) => {
					return context.prisma.protein.findMany();
				},
				allGenes: (parent, args, context) => {
					return context.prisma.gene.findMany();
				},
				geneByID: (parent, args, context) => {
					return context.prisma.gene.findUnique({
						where: {
							ID: args['ID']
						}
					});
				}
			}
		}
	},
	plugins: [],
	context: { prisma: new PrismaClient() },
	graphiql: {
		endpoint: '/data/query'
	}
});

export const GET = async (event) => {
	return serverApp.handleRequest(event.request, event);
};

export const POST = async (event) => {
	return serverApp.handleRequest(event.request, event);
};
