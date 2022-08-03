import { createServer } from '@graphql-yoga/common';
import { PrismaClient } from '@prisma/client';

import { BigIntResolver } from 'graphql-scalars';

const serverApp = createServer({
	schema: {
		typeDefs: `
			scalar BigInt

			type Query {
				allProteins: [Protein]
				allGenes: [Gene]
			
				geneByID(ID: BigInt!): Gene
			}

			type Protein {
				Gene_Symbol: String!
				Name: String
				Branch: String
				Class: String
				Group: String
				Subgroup: String
				Type: String
				Distinguishing_Domains: String
				UniProt_ID: String
			}
			
			type Query {
				allProteins: [Protein]
				allGenes: [Gene]
			
				geneByID(ID: BigInt!): Gene
			}
		`,
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
