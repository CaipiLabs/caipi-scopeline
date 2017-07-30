/*
 * Copyright (c) 2017.  Caipi Labs.  All rights reserved.
 *
 * This File is part of Caipi. You can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *  This project is dual licensed under AGPL and Commercial Licence.
 *
 * @author : Nathanael Braun
 * @contact : caipilabs@gmail.com
 */

"use strict";

module.exports = function (_scope, cfg, target) {
    var fn = "";

    target && (fn += "scope = scope['" + target + "'];\n");

    for (var k in cfg.apply) {
        if (cfg.apply.hasOwnProperty(k)) {

            _scope && (_scope[k] = _scope[k] || 0);

            fn += "scope." + k + "+=" + (cfg.easeFn ? "cfg.easeFn(0, lastPos+update, 0, cfg.apply." + k + ", 1)" + "- cfg.easeFn(0, lastPos, 0, cfg.apply." + k + ", 1);" : "cfg.apply." + k + "*update;");
        }
    }return new Function("lastPos, update, scope, cfg, target", fn);
};
module.exports.isFactory = true;