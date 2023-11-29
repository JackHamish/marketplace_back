import { Prisma } from "@prisma/client";

export const NFT_INCLUDE = Prisma.validator<Prisma.NftDefaultArgs>()({
  select: {
    id: true,
    title: true,
    url: true,
    user: { select: { name: true } },
  },
})