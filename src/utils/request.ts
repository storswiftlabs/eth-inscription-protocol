'use client'
import { useSendTransaction, useWalletClient } from 'wagmi'
import { createGroup, createProfile, sendMessage, tweetComment, tweetFollow, tweetLike, tweetSend, updareProfile, updateGroupAdd, updateGroupDel } from './InterfaceType'




/**
 * @description 发送交易的钩子函数。
 * @param {number} chainId 检查当前链以确保与 chainId 相同。如果 chainId 不是当前链，则该操作将抛出错误。
 * @param {string} account 发送交易的账户。
 * @param {parseGwei('20')} gasPrice 每个燃气的价格（以wei为单位）。仅适用于传统交易。
 * @param {parseGwei('20')} maxFeePerGas 最大每单位燃气费用 包括 maxPriorityFeePerGas 。仅适用于EIP-1559交易。
 * @param {parseGwei('20')} maxPriorityFeePerGas 每个燃气的最大优先费用（以wei为单位）。仅适用于EIP-1559交易。
 * @param {number} nonce 唯一标识此交易的编号。
 * @param {parseEther('1')} value 此交易中发送的以wei为单位的价值。
 * @returns {object} 包含发送交易状态、数据和加载状态的对象。
 */


/**
 * @description 创建 profile 的钩子函数。
 * @param {createProfile} chainData 包含要创建的 profile 数据的对象。
 * @returns {object} 包含发送交易状态、数据和加载状态的对象。
 */
export const cochainCreateProfile = (chainData: createProfile) => { 
  const { data: walletClient } = useWalletClient()
  const { data, isLoading, isSuccess, sendTransaction } = useSendTransaction({
    to: walletClient?.account.address,
    data: `0x${Buffer.from(JSON.stringify(chainData), 'utf-8').toString('hex')}` || undefined,
  });
  return { sendTransaction, data, isLoading, isSuccess };
};

/**
 * @description 更新 profile 的钩子函数。
 * @param {updareProfile} chainData 包含要更新的 profile 数据的对象。
 * @returns {object} 包含发送交易状态、数据和加载状态的对象。
 */
export const cochainUpdareProfile = (chainData: updareProfile) => { 
  const { data: walletClient } = useWalletClient()
  const { data, isLoading, isSuccess, sendTransaction } = useSendTransaction({
    to: walletClient?.account.address,
    data: `0x${Buffer.from(JSON.stringify(chainData), 'utf-8').toString('hex')}` || undefined,
  });
  return { sendTransaction, data, isLoading, isSuccess };
};

/**
 * @description 发送消息的钩子函数。
 * @param {sendMessage} chainData 包含要发送的消息数据的对象。
 * @returns {object} 包含发送交易状态、数据和加载状态的对象。
 */
export const cochainSendMessage = (chainData: sendMessage) => { 
  const { data: walletClient } = useWalletClient()
  const { data, isLoading, isSuccess, sendTransaction } = useSendTransaction({
    to: walletClient?.account.address,
    data: `0x${Buffer.from(JSON.stringify(chainData), 'utf-8').toString('hex')}` || undefined,
  });
  return { sendTransaction, data, isLoading, isSuccess };
};

/**
 * @description 创建群聊的钩子函数。
 * @param {createGroup} chainData 包含要发送的消息数据的对象。
 * @returns {object} 包含发送交易状态、数据和加载状态的对象。
 */
export const cochainCreateGroup = (chainData: createGroup) => { 
  const { data: walletClient } = useWalletClient()
  const { data, isLoading, isSuccess, sendTransaction } = useSendTransaction({
    to: walletClient?.account.address,
    data: `0x${Buffer.from(JSON.stringify(chainData), 'utf-8').toString('hex')}` || undefined,
  });
  return { sendTransaction, data, isLoading, isSuccess };
};

/**
 * @description 更新组添加的钩子函数。
 * @param {updateGroupAdd} chainData 包含要更新的组添加数据的对象。
 * @returns {object} 包含发送交易状态、数据和加载状态的对象。
 */
export const cochainUpdateGroupAdd = (chainData: updateGroupAdd) => { 
  const { data: walletClient } = useWalletClient()
  const { data, isLoading, isSuccess, sendTransaction } = useSendTransaction({
    to: walletClient?.account.address,
    data: `0x${Buffer.from(JSON.stringify(chainData), 'utf-8').toString('hex')}` || undefined,
  });
  return { sendTransaction, data, isLoading, isSuccess };
};

/**
 * @description 更新组删除的钩子函数。
 * @param {updateGroupDel} chainData 包含要更新的组添加数据的对象。
 * @returns {object} 包含发送交易状态、数据和加载状态的对象。
 */
export const cochainUpdateGroupDel = (chainData: updateGroupDel) => { 
  const { data: walletClient } = useWalletClient()
  const { data, isLoading, isSuccess, sendTransaction } = useSendTransaction({
    to: walletClient?.account.address,
    data: `0x${Buffer.from(JSON.stringify(chainData), 'utf-8').toString('hex')}` || undefined,
  });
  return { sendTransaction, data, isLoading, isSuccess };
};

/**
 * @description 发送推文的钩子函数。
 * @param {tweetSend} chainData 包含要更新的组添加数据的对象。
 * @returns {object} 包含发送交易状态、数据和加载状态的对象。
 */
export const cochainTweetSend = (address:`0x${string}` | undefined,chainData: tweetSend) => { 
  const { data, isLoading, isSuccess, sendTransaction } = useSendTransaction({
    to: address,
    data: `0x${Buffer.from(JSON.stringify(chainData), 'utf-8').toString('hex')}` || undefined,
  });
  return { sendTransaction, data, isLoading, isSuccess };
};

/**
 * @description 评论推文的钩子函数。
 * @param {tweetComment} chainData 包含要更新的组添加数据的对象。
 * @returns {object} 包含发送交易状态、数据和加载状态的对象。
 */
export const cochainTweetComment = (chainData: tweetComment) => { 
  const { data: walletClient } = useWalletClient()
  const { data, isLoading, isSuccess, sendTransaction } = useSendTransaction({
    to: walletClient?.account.address,
    data: `0x${Buffer.from(JSON.stringify(chainData), 'utf-8').toString('hex')}` || undefined,
  });
  return { sendTransaction, data, isLoading, isSuccess };
};

/**
 * @description 点赞推文的钩子函数。
 * @param {tweetLike} chainData 包含要更新的组添加数据的对象。
 * @returns {object} 包含发送交易状态、数据和加载状态的对象。
 */
export const cochainTweetLike = (chainData: tweetLike) => { 
  const { data: walletClient } = useWalletClient()
  const { data, isLoading, isSuccess, sendTransaction } = useSendTransaction({
    to: walletClient?.account.address,
    data: `0x${Buffer.from(JSON.stringify(chainData), 'utf-8').toString('hex')}` || undefined,
  });
  return { sendTransaction, data, isLoading, isSuccess };
};

/**
 * @description 关注的钩子函数。
 * @param {tweetFollow} chainData 包含要更新的组添加数据的对象。
 * @returns {object} 包含发送交易状态、数据和加载状态的对象。
 */
export const cochainTweetFollow = (chainData: tweetFollow) => { 
  const { data: walletClient } = useWalletClient()
  const { data, isLoading, isSuccess, sendTransaction } = useSendTransaction({
    to: walletClient?.account.address,
    data: `0x${Buffer.from(JSON.stringify(chainData), 'utf-8').toString('hex')}` || undefined,
  });
  return { sendTransaction, data, isLoading, isSuccess };
};

