/**
 * Scene node that constructs a perspective projection matrix and sets it on the current shader.
 */

SceneJS.perspective = function() {
    var cfg = SceneJS._utils.getNodeConfig(arguments);
    var backend = SceneJS._backends.getBackend('projection');
    var projection;

    return SceneJS._utils.createNode(
            function(scope) {
                if (!projection || !cfg.fixed) {
                    var params = cfg.getParams(scope);
                    var tempMat = SceneJS._math.perspectiveMatrix4(
                            (params.fovy || 60.0) * Math.PI / 180.0,
                            params.aspect || 1.0,
                            params.near || 0.1,
                            params.far || 400.0);

                    projection = {
                        matrix:tempMat
                    };
                }
                var prevProjection = backend.getTransform();
                backend.setTransform(projection);
                SceneJS._utils.visitChildren(cfg, scope);
                backend.setTransform(prevProjection);
            });
};

