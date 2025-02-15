/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContainer } from "inversify-react";
import React from 'react';

export function InjectableComponent<
    P extends Record<string, any>, // Original props type
    D extends Partial<Record<keyof P, symbol>> // Dependencies mapped to symbols, optional, must match keys of P
>(
    WrappedComponent: React.ComponentType<P>, // Expecting WrappedComponent with type P
    dependencies: D // Allow optional dependencies
): React.ComponentType<Omit<P, keyof D>> { // Return type: same props, but excluding dependencies
    const ComponentWithInjection = (props: Omit<P, keyof D>) => {
        const container = useContainer();
        const resolvedDependencies: Partial<P> = {};

        // Resolve dependencies
        for (const key in dependencies) {
            const dependencyKey = dependencies[key as keyof typeof dependencies]; // Get the dependency key
            if (dependencyKey !== undefined) {
                // Resolve the dependency using the container
                resolvedDependencies[key as keyof P] = container.get(dependencyKey);
            }
        }

        // Pass resolved dependencies along with other props to the wrapped component
        return <WrappedComponent {...(resolvedDependencies as P)} {...props} />;
    };

    // Set displayName for the component
    ComponentWithInjection.displayName = `injectable(${WrappedComponent.displayName || WrappedComponent.name})`;

    return ComponentWithInjection;
}