// window.actions = [];

export default ({ getState, dispatch}) => next => action => {
    console.log(`ACTION: ${action.type}`, action);

    // window.actions.push(action);

    next(action);
}