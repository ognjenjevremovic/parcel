// @flow strict-local
import type {FilePath} from '@parcel/types';
import path from 'path';
import {relativePath} from '@parcel/utils';

export opaque type ProjectPath = string;

export function toProjectPath_(
  projectRoot: FilePath,
  p: FilePath,
): ProjectPath {
  return relativePath(projectRoot, p);
}

export const toProjectPath: ((
  projectRoot: FilePath,
  p: FilePath,
) => ProjectPath) &
  // $FlowFixMe Not sure how to type properly
  ((projectRoot: FilePath, p: ?FilePath) => ?ProjectPath) = toProjectPath_;

export function fromProjectPath_(
  projectRoot: FilePath,
  p: ?ProjectPath,
): ?FilePath {
  return p != null ? path.join(projectRoot, p) : p;
}

export const fromProjectPath: ((
  projectRoot: FilePath,
  p: ProjectPath,
) => FilePath) &
  // $FlowFixMe Not sure how to type properly
  ((projectRoot: FilePath, p: ?ProjectPath) => ?FilePath) = fromProjectPath_;

export function fromProjectPathRelative(p: ProjectPath): FilePath {
  return p;
}

export function toProjectPathUnsafe(p: FilePath): ProjectPath {
  return p;
}

export function joinProjectPath(
  a: ProjectPath,
  ...b: Array<FilePath>
): ProjectPath {
  return path.join(a, ...b);
}
