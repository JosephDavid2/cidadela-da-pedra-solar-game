export interface Player {
  skill: number;
  energy: number;
  luck: number;
  initialSkill: number;
  initialEnergy: number;
  initialLuck: number;
  inventory: Item[];
  provisions: number;
  attackBonus: number;
  tempDamageBonus: number;
  visitedSections: number[];
  isParalyzed: boolean;
}

export interface Item {
  id: string;
  name: string;
  description: string;
  options?: {
    isWeapon?: boolean;
    restores?: number; // 'energy' or 'luck' (full)
    stat?: 'skill' | 'attackBonus';
    bonus?: number;
  }
}

export interface Enemy {
  id: string;
  name: string;
  skill: number;
  energy: number;
  special?: 'paralyze_on_win';
}

export type GameAction =
  | { type: 'GOTO'; sectionId: number }
  | { type: 'FIGHT'; enemyId: string; winSectionId: number; loseSectionId: number }
  | { type: 'TEST_LUCK'; successSectionId: number; failureSectionId: number }
  | { type: 'TEST_SKILL'; successSectionId: number; failureSectionId: number }
  | { type: 'TEST_INITIAL_SKILL'; successSectionId: number; failureSectionId: number }
  | { type: 'TAKE_ITEM'; itemId: string; nextSectionId: number }
  | { type: 'LOSE_ENERGY'; amount: number; nextSectionId: number }
  | { type: 'RESTORE_LUCK'; nextSectionId: number }
  | { type: 'END_GAME'; outcome: 'victory' | 'failure' | 'partial_success' };


export interface Choice {
  text: string;
  action: GameAction;
  disabled?: boolean;
  requiresItem?: string;
  requiresNoItem?: string;
  disabledIfVisited?: number;
}

export interface StorySection {
  text: string;
  choices: Choice[];
  imageUrl?: string;
  audioUrl?: string;
}

export interface DiceRoll {
  die1: number;
  die2: number;
  total: number;
}

export type GameState = 'creating' | 'intro' | 'reading' | 'fighting' | 'testing_luck' | 'game_over' | 'victory' | 'partial_victory';

export interface CombatState {
  enemy: Enemy;
  winSectionId: number;
  loseSectionId: number;
}
