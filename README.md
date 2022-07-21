# Protein Interaction Mapper [![Maintainer](https://img.shields.io/badge/maintainer-Proteostasis%20Consortium-blue)](https://www.proteostasisconsortium.com) [![License](https://img.shields.io/github/license/finkbeiner-lab/protein-interaction-mapper)](https://github.com/finkbeiner-lab/protein-interaction-mapper/blob/main/LICENSE)

## Overview

New proteins can fold into their native structures during or after translation. However, this process is far from perfect, and often fails (Balch et al., 2008; Clark, 2004; Gershenson et al., 2014; Powers et al., 2009), leaving proteins in non-native states that are not functional and potentially toxic— especially if they form aggregates (Balch et al., 2008; Knowles et al., 2014; Powers and Gierasch, 2021; Powers et al., 2009). Because of this, all organisms, beginning with the last universal common ancestor (Powers and Balch, 2013), have a proteostasis network: a collection of cellular components that manage folding, trafficking, and degradation of the members of the proteome (Balch et al., 2008; Jayaraj et al., 2020; Powers and Gierasch, 2021; Powers et al., 2009). The proteostasis network is much discussed in the literature, but remains ill-defined, because there is no comprehensive consensus of proteostasis network components, although substantive preliminary efforts have been made (Brehme et al., 2014; Shemesh et al., 2021). We address this issue here by providing a comprehensive enumeration of the human proteostasis network, widely accessible on a web-based interface.

Our database so far contains proteostasis network components responsible for protein folding (chaperones and folding enzymes), protein trafficking into and out of organelles, and protein synthesis. The autophagy-lysosome pathway and ubiquitin-proteasome system will be added in future updates.

To enumerate the components of the proteostasis network systems detailed above, we apply two criteria.

1. The “entity-based” criterion: an “entity” (an individual protein or other substance, or a complex) is included as a member of the proteostasis network, if there is specific evidence in the literature of its role in proteostasis.

2. The “domain-based” criterion: an entity is included as a member of the proteostasis network, if it contains a domain or domains that are very strongly associated with proteostasis, even if there is no literature evidence that it had a role in proteostasis.

The latter criterion is important for the inclusion of uncharacterized proteins, which are clearly members of structural families with roles in proteostasis. For example, HSPA12A and HSPA12B have not, to our knowledge, been shown to have chaperone activity; yet sequence homology indicates they are members of the HSP70 chaperone family. Thus, such proteins are included in the proteostasis network.

We developed a taxonomic scheme to organize our enumeration of the proteostasis network, which is illustrated below. This taxonomy consists of five levels: *Branch*, *Class*, *Group*, *Type*, and *Subtype*.

![Proteostasis network components](proteostasisNetworkComponents.png)

The broadest category, *Branch*, refers to a component’s localization or its membership in an overarching pathway. There are only a handful of *Branch* categories:

- cytonuclear proteostasis
- endoplasmic reticulum proteostasis
- mitochondrial proteostasis
- nuclear proteostasis
- cytosolic translation
- autophagy-lysosome pathway
- ubiquitin-proteasome system

Note that “cytonuclear” components can, in principle, function in either the cytosol or the nucleus; “nuclear” components function primarily within the nucleus (e.g., histone chaperones). Also, as noted above, the autophagy-lysosome pathway and ubiquitin-proteasome system will be added in future updates.

*Class* generally refers to a component’s function in proteostasis (e.g., chaperones, protein transport, etc.).

While *Group*, *Type*, and *Subtype* become increasingly specific descriptors of proteostasis functions, we only use as many descriptors as necessary to describe a proteostasis network component. Thus, not every component has *Type* or *Subtype* annotations. Also, many components have multiple roles in the proteostasis network. These are given multiple entries in our list to reflect each separate role.

We emphasize this enumeration is a dynamic entity that will be updated as new information becomes available. In particular, we are hopeful that the visitors to this website will provide us with feedback regarding the composition of this list of proteostasis network components. Please start a GitHub Discussion, or email [Evan Powers](https://www.proteostasisconsortium.com/people/) at [epowers@scripps.edu](mailto:epowers@scripps.edu), with suggestions for components you feel should be included. We regard this list is an initial compilation which will evolve continuously, as new experimental data on human proteostasis becomes available.

## Developing

1. Install [Node.js >=16](https://nodejs.org/en/download/)
2. Open this repo directory in your IDE, code editor or CLI and run

    ```bash
    npm install && npm run dev
    ```

3. Open a pull request with your contribution. We will review it & provide feedback shortly!

## Building

To create a production version:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for the target environment.
