type Mapping = {
  filter?: Record<string, string | string[]>;
  topic?: Mapping.Topic;
  assignment?: Mapping.Assignment;
};

namespace Mapping {
  export type Topic = {
    title: string;
    description?: string;
    materials?: Topic.Material[];
  };

  export namespace Topic {
    export type Material = {
      type: string;
    } & Record<string, string>;

    export namespace Material {
      export type LearningTool = Material & {
        type: 'Learning Tool';
        provider: string;
        title: string;
        description?: string;
        launchUrl?: string;
      };
    }
    export function isLearningTool(
      material: Material
    ): material is Mapping.Topic.Material.LearningTool {
      return material.type == 'Learning Tool';
    }
  }
  export type Assignment = {
    title: string;
    description?: string;
    maxPoints?: number;
    learningTool?:
      | string
      | {
          name: string;
          launchUrl: string;
        };
  };
}

export default Mapping;
