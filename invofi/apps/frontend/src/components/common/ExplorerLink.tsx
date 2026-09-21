import type { MouseEventHandler, ReactNode } from 'react';
import { ExternalLink } from 'lucide-react';
import {
  explorerAccountUrl,
  explorerContractUrl,
  explorerTxUrl,
} from '@/lib/constants';

export type ExplorerLinkType = 'account' | 'contract' | 'tx';

const hrefFor = (type: ExplorerLinkType, value: string): string => {
  switch (type) {
    case 'account':
      return explorerAccountUrl(value);
    case 'contract':
      return explorerContractUrl(value);
    case 'tx':
      return explorerTxUrl(value);
  }
};

/** Network-aware Stellar Expert href for account/address call sites. */
export const explorerAddressHref = (address: string): string => explorerAccountUrl(address);

interface ExplorerLinkProps {
  type: ExplorerLinkType;
  value: string;
  children: ReactNode;
  className?: string;
  title?: string;
  ariaLabel?: string;
  showIcon?: boolean;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}

/**
 * Shared Stellar Expert link.
 *
 * URL construction stays centralized in lib/constants so mainnet continues
 * using /public and non-mainnet deployments continue using /testnet.
 */
export function ExplorerLink({
  type,
  value,
  children,
  className,
  title,
  ariaLabel,
  showIcon = false,
  onClick,
}: ExplorerLinkProps) {
  return (
    <a
      href={hrefFor(type, value)}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      title={title}
      aria-label={ariaLabel}
      onClick={onClick}
    >
      {children}
      {showIcon && <ExternalLink className="inline h-3 w-3" aria-hidden="true" />}
    </a>
  );
}
